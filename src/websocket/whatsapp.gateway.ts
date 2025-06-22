// src/websocket/whatsapp.gateway.ts
import { Inject, forwardRef } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WhatsappService } from 'src/services/whatsapp.service';

@WebSocketGateway({
    namespace: '/whatsapp',
    cors: true,
})
export class WhatsappGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject(forwardRef(() => WhatsappService))
        private readonly whatsappService: WhatsappService,
    ) { }

    async afterInit() {
        await this.whatsappService.initialize(this.server);
    }
}
