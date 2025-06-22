import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { initVenom } from './whatsapp/venom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await initVenom(
    (qr) => console.log('QR code ready'),
    () => console.log('WhatsApp ready!'),
    () => console.log('WhatsApp disconnected.')
  );

  await app.listen(process.env.PORT ?? 3000);

  
}
bootstrap();
