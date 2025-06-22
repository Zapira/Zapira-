import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { WhatsappModule } from './whatsapp.module';
import { WhatsappController } from 'src/controllers/whatsapp.controller';

@Module({
  imports: [WhatsappModule],
  controllers: [AppController, WhatsappController],
  providers: [AppService],
})
export class AppModule {}
