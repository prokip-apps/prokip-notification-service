import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      // This allows you to transform or log the response here
      map((responseData) => {
        const response = context.switchToHttp().getResponse();
        console.log(`Response Status: ${response.statusCode}`);
        console.log(`Request-Response Time: ${Date.now() - now}ms`);
        return responseData; // Optionally, you can modify responseData before returning
      }),
    );
  }
}
