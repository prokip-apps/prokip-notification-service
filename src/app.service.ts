import { Injectable } from '@nestjs/common';
import { APIResponse } from './common/api/response.net';

@Injectable()
export class AppService {
  getHello() {
    return APIResponse.successResponse({
      message: 'Welcome to Prokip Notification',
    });
  }
}
