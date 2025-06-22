import { create, Whatsapp } from 'venom-bot';

let client: Whatsapp | null = null;
let isReady = false;

export const initVenom = async (onQr, onReady, onDisconnect) => {
    client = await create({
        session: 'rizkibot',
        headless: 'new',
        logQR: true,
        disableWelcome: true,
        disableSpins: true,
        autoClose: 0,
        updatesLog: false,
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    client.onStateChange((state) => {
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') {
            if (client) {
                client.useHere();
            }
        }
    });

    client.onStreamChange((state) => {
        if (state === 'DISCONNECTED') {
            isReady = false;
            onDisconnect();
        }
    });

    isReady = true;
    onReady();
};

export const getClient = (): Whatsapp | null => {
    return isReady && client ? client : null;
};

export const isClientReady = () => isReady;
