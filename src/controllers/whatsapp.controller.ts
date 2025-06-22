import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from 'src/services/whatsapp.service';
@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly WhatsappService: WhatsappService) {}


    @Post('send')
    async sendMessage(@Body() body: {to: string; message: string}){
        const {to, message} = body

        if(!to || !message){
            throw new BadRequestException('testing');
        }

        try {
            const result = await this.WhatsappService.sendMessage(to, message)
            return {
                status: "success",
                data: result
            }
        } catch (error) {
            return {
                status: "error",
                message: error.message
            }
        }
    }
}
