import { Injectable } from '@nestjs/common';
import { sendSMSDTO } from '../dto/send-sms.dto';
import { SMS_COUNTRY } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { APIResponse } from 'src/common/api/response.net';
const axios = require('axios');
const FormData = require('form-data');

@Injectable()
export class AfricasTalkingService {
  constructor(private configService: ConfigService) {}

  async sendSMS(body: sendSMSDTO) {
    const credentials = {
      username: '',
      apiKey: '',
    };
    switch (body.country) {
      case SMS_COUNTRY.GHANA:
        credentials.username = this.configService.get(
          'sms.africastalking.ghana.username',
        );
        credentials.apiKey = this.configService.get(
          'sms.africastalking.ghana.apiKey',
        );
        break;

      case SMS_COUNTRY.KENYA:
        credentials.username = this.configService.get(
          'sms.africastalking.kenya.username',
        );
        credentials.apiKey = this.configService.get(
          'sms.africastalking.kenya.apiKey',
        );
        break;

      case SMS_COUNTRY.NIGERIA:
        credentials.username = this.configService.get(
          'sms.africastalking.nigeria.username',
        );
        credentials.apiKey = this.configService.get(
          'sms.africastalking.nigeria.apiKey',
        );

        break;

      case SMS_COUNTRY.RWANDA:
        credentials.username = this.configService.get(
          'sms.africastalking.rwanda.username',
        );
        credentials.apiKey = this.configService.get(
          'sms.africastalking.rwanda.apiKey',
        );
        break;

      case SMS_COUNTRY.UGANDA:
        credentials.username = this.configService.get(
          'sms.africastalking.uganda.username',
        );
        credentials.apiKey = this.configService.get(
          'sms.africastalking.uganda.apiKey',
        );
        break;

      default:
        break;
    }

    const form = new FormData();
    form.append('username', credentials.username);
    form.append('to', body.phone.join());
    form.append('message', body.message);
    form.append('from', body.sender);
    form.append('enqueue', '1');

    axios
      .post('https://api.africastalking.com/version1/messaging', form, {
        headers: {
          Accept: 'application/json',
          apiKey: credentials.apiKey,
          ...form.getHeaders(),
        },
      })
      .then((response) => {
        console.log(response.data);
        return APIResponse.successResponse({
          message: 'operation successful',
          data: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
