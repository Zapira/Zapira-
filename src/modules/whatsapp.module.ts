// src/modules/whatsapp.module.ts (atau di mana pun kamu definisikan)
import { Module, forwardRef } from '@nestjs/common';
import { WhatsappController } from 'src/controllers/whatsapp.controller';
import { WhatsappService } from 'src/services/whatsapp.service';
import { WhatsappGateway } from 'src/websocket/whatsapp.gateway';

@Module({
    controllers: [WhatsappController],
    providers: [
        WhatsappGateway,
        { provide: WhatsappService, useClass: WhatsappService },
    ],
    exports: [WhatsappService], 
})
export class WhatsappModule { }
