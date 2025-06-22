import { create, Whatsapp } from 'venom-bot';
import * as qrcode from 'qrcode-terminal';

let client: Whatsapp;

export const initVenom = async (onQr, onReady, onDisconnect) => {
    client = await create({
        session: 'rizkibot',
        headless: "new", 
        logQR: true, 
        disableWelcome: true,
        disableSpins: true,
        autoClose: 0,
        updatesLog: false,
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    client.onStateChange((state) => {
        console.log('State changed:', state);
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') {
            client.useHere();
        }
    });

    client.onStreamChange((state) => {
        console.log('Stream state changed:', state);
        if (state === 'DISCONNECTED') {
            onDisconnect();
        }
    });

    onReady();
    return client;
};

export const getClient = () => client;
