import { Controller, Get } from '@nestjs/common';
import { RedeemService } from './redeem.service';

@Controller()
export class RedeemController {
  constructor(private readonly redeemService: RedeemService) {}

  @Get()
  getHello(): string {
    return this.redeemService.getHello();
  }
}
