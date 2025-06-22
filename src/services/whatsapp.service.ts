import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { getClient, initVenom } from "src/whatsapp/venom";

@Injectable()
export class WhatsappService {
    private wsServer: Server;

    async initialize(wsServer: Server): Promise<void> {
        this.wsServer = wsServer;

        await initVenom(
            (qr: string) => {
                this.wsServer?.emit('qr', { qr });
            },
            () => {
                this.wsServer?.emit('ready', { status: 'connected' });
            },
            () => {
                this.wsServer?.emit('disconnected', { status: 'disconnected' });
            }
        );
    }

    async sendMessage(to: string, message: string): Promise<any> {
        const client = getClient();
        if (!client) throw new Error("WhatsApp client is not initialized.");
    
        const cleanedTo = to.replace(/\D/g, ''); 
        const formattedTo = cleanedTo.includes('@') ? cleanedTo : `${cleanedTo}@c.us`;
    
        try {
            const result = await client.sendText(formattedTo, message);
            this.wsServer?.emit?.('messageSent', { number: formattedTo, result });
            return result;
        } catch (error: any) {
            console.error('Error saat kirim WA (raw):', error);
    
            let errMsg = 'Unknown error';
            if (typeof error === 'string') {
                errMsg = error;
            } else if (error?.message) {
                errMsg = error.message;
            } else {
                try {
                    errMsg = JSON.stringify(error);
                } catch (_) {
                    errMsg = String(error);
                }
            }
    
            throw new Error(`Failed to send message: ${errMsg}`);
        }
    }

    async checkConnection(): Promise<string> {
        const client = getClient();
        if (!client) throw new Error("WhatsApp client is not initialized.");

        try {
            const state = await client.getConnectionState();
            return `WhatsApp client is in state: ${state}`;
        } catch (error: any) {
            console.error('Error checking connection:', error);
            throw new Error(`Failed to check connection: ${error.message || 'Unknown error'}`);
        }
    }
}