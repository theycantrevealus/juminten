import { Controller } from "@nestjs/common"
import { WorkerEligibilityService } from "./worker_eligibility.service"
import { GrpcMethod } from "@nestjs/microservices"

@Controller()
export class WorkerEligibilityController {
  constructor(
    private readonly workerEligibilityService: WorkerEligibilityService,
  ) {}

  @GrpcMethod("EligibilityService", "EligibilityCheck")
  checkEligibility(data: {
    transaction_id: string
    keyword: string
    msisdn: string
  }) {
    console.log("Received data : ${data}")
    return {
      ...data,
      eligibility: true,
    }
  }
}
