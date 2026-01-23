import {
  CallHandler,
  ExecutionContext,
  RequestTimeoutException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { isExpressRequest } from "@util/http"
import { catchError, tap, throwError, TimeoutError } from "rxjs"
import { Logger } from "winston"
import { FastifyRequest } from "fastify"
import { PATH_METADATA } from "@nestjs/common/constants"
import { GlobalResponse } from "@shared/interface/global.response"
import { responseCode } from "@shared/response.code"

export async function httpInterceptor(
  context: ExecutionContext,
  next: CallHandler,
  reflector: Reflector,
  logger: Logger,
) {
  const http = context.switchToHttp()
  const request = http.getRequest()
  const response = http.getResponse()
  const path = reflector.get<string[]>(PATH_METADATA, context.getHandler())
  const method = isExpressRequest(request)
    ? request.method
    : (request as FastifyRequest).method
  return next.handle().pipe(
    catchError((err) => {
      if (err instanceof TimeoutError) {
        return throwError(() => new RequestTimeoutException())
      }
      return throwError(() => err)
    }),
    tap(async (result: any) => {
      // TODO : Logger here if you need to log gateway request (ESB - Tere)

      if (path.toString() === "signin") {
        /**
         * Because sign in endpoint has no payload parameter by defined on IFA
         */
        response.code(responseCode.CODE_SUCCESS.httpCode).send({
          code: responseCode.CODE_SUCCESS.customCode,
          message: "Success",
          ...result,
        })
      } else {
        response.code(responseCode.CODE_SUCCESS.httpCode).send({
          code: responseCode.CODE_SUCCESS.customCode,
          message: "Success",
          payload: result,
        } satisfies GlobalResponse)
      }
    }),
  )
}
