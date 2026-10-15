import { NestFactory } from "@nestjs/core"
import { WorkerEligibilityModule } from "./worker_eligibility.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { join } from "node:path"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerEligibilityModule,
    {
      transport: Transport.GRPC,
      options: {
        url: "0.0.0.0:8501",
        package: "eligibility",
        protoPath: join(__dirname, "proto/eligibility.proto"),
      },
    },
  )
  await app.listen()
}
bootstrap()
