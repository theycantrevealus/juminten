import { ArgumentsHost } from "@nestjs/common"
import { GlobalResponse } from "@shared/interface/global.response"
import { responseCode } from "@shared/response.code"
import { hasSameKeys } from "@util/filter"
import { isExpressRequest } from "@util/http"
import { isJSON } from "class-validator"
import { FastifyReply, FastifyRequest } from "fastify"
import { Logger } from "winston"

export async function errorHttpHandler(
  exception: any,
  host: ArgumentsHost,
  logger: Logger,
) {
  const ctx = host.switchToHttp()
  const response = ctx.getResponse<FastifyReply>()
  const request = ctx.getRequest()
  const method = isExpressRequest(request)
    ? request.method
    : (request as FastifyRequest).method

  let responseSet: GlobalResponse = {
    code: responseCode.CODE_INTERNAL_ERROR.customCode,
    message: exception.message,
    payload: exception,
  }

  const errorPayload = exception.message.replace("Error: ", "").trim()
  let httpCode: number = responseCode.UNKNOWN_ERROR.httpCode
  if (isJSON(errorPayload)) {
    const errorParsed = JSON.parse(errorPayload)
    if (hasSameKeys(errorParsed, responseSet)) {
      responseSet = errorParsed
    } else {
      responseSet.payload = errorParsed
    }
  } else {
    switch (exception.constructor.name) {
      case "MongoServerError":
        responseSet.message = exception.errorResponse.errmsg

        break

      case "NotFoundException":
        httpCode = responseCode.ERR_NOT_FOUND.httpCode
        responseSet.code = responseCode.ERR_NOT_FOUND.customCode
        break

      case "BadRequestException":
        httpCode = responseCode.ERR_CONTENT_TYPE_INVALID.httpCode
        responseSet.code = responseCode.ERR_CONTENT_TYPE_INVALID.customCode
        break

      default:
        httpCode = responseCode.UNKNOWN_ERROR.httpCode
        responseSet.code = responseCode.UNKNOWN_ERROR.customCode
    }
  }

  // TODO : You also could add logging here

  response.status(httpCode).send(responseSet)
}
