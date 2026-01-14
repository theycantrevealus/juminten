import { ArgumentsHost, Catch, ExceptionFilter, Inject } from "@nestjs/common"
import { Logger } from "winston"

import { WINSTON_MODULE_PROVIDER } from "@module/logger/constant"
import { errorHttpHandler } from "./http"

@Catch()
export class CommonErrorFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}
  async catch(exception: any, host: ArgumentsHost) {
    if (host.getType() === "http") {
      await errorHttpHandler(exception, host, this.logger)
    } else {
    }
  }
}
