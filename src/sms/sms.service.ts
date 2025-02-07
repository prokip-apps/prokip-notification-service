import { Injectable } from '@nestjs/common';
import { sendSMSDTO } from './dto/send-sms.dto';
import { SMS_PROVIDER } from 'src/common/interfaces';
import { AfricasTalkingService } from './provider/africastalkin.service';

@Injectable()
export class SmsService {
  constructor(private aft: AfricasTalkingService) {}

  async sendMessage(body: sendSMSDTO) {
    switch (body.provider) {
      case SMS_PROVIDER.AFT:
        return await this.aft.sendSMS(body);
        break;

      case SMS_PROVIDER.BETASMS:
        break;

      case SMS_PROVIDER.SENDCHAMP:
        break;

      case SMS_PROVIDER.TERMII:
        break;

      default:
        break;
    }
  }

  async createTask() {
    // Run the task in the background
    this.handleTaskInBackground('1');

    // Return an immediate response to the client
    return { message: 'Task is being processed', taskId: Date.now() }; // Optionally include a unique task ID
  }

  private async handleTaskInBackground(data: any) {
    console.log('Starting long-running task with data:', data);

    // Simulate a long-running operation
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log('Task completed with data:', data);
    // Optionally save the result to a database or take other actions
  }
}
