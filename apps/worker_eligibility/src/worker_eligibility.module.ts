import { Module } from '@nestjs/common';
import { WorkerEligibilityController } from './worker_eligibility.controller';
import { WorkerEligibilityService } from './worker_eligibility.service';

@Module({
  imports: [],
  controllers: [WorkerEligibilityController],
  providers: [WorkerEligibilityService],
})
export class WorkerEligibilityModule {}
