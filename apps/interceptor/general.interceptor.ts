import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { httpInterceptor } from "./http.interceptor"
import { Reflector } from "@nestjs/core"
import { WINSTON_MODULE_PROVIDER } from "@module/logger/constant"
import { Logger } from "winston"

export interface Response<T> {
  data: T
}

export class GeneralInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    private readonly reflector: Reflector,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Promise<Observable<any>> {
    if (context.getType() === "http") {
      return await httpInterceptor(context, next, this.reflector, this.logger)
    } else if (context.getType() === "rpc") {
    } else if (context.getType() === "ws") {
    }
  }
}
