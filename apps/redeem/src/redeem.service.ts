import { Injectable } from '@nestjs/common';

@Injectable()
export class RedeemService {
  getHello(): string {
    return 'Hello World!';
  }
}
