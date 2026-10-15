import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerEligibilityService {
  getHello(): string {
    return 'Hello World!';
  }
}
