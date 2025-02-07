import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { AfricasTalkingService } from './provider/africastalkin.service';

@Module({
  controllers: [SmsController],
  providers: [SmsService, AfricasTalkingService],
})
export class SmsModule {}
