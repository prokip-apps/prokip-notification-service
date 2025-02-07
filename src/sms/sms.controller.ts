import { Body, Controller, Get, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiTags } from '@nestjs/swagger';
import { sendSMSDTO } from './dto/send-sms.dto';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post()
  async sms(@Body() body: sendSMSDTO) {
    return await this.smsService.sendMessage(body);
  }

  @Get('test')
  async createTask() {
    // Run the task in the background
    return await this.smsService.createTask()
  }
}
