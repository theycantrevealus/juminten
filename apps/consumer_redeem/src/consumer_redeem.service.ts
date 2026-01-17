import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumerRedeemService {
  getHello(): string {
    return 'Hello World!';
  }
}
