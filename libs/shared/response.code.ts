import { HttpStatus } from "@nestjs/common"

export const responseCode = {
  CODE_SUCCESS: {
    httpCode: HttpStatus.ACCEPTED,
    customCode: "S00000",
  },
  CODE_SKIP: {
    httpCode: HttpStatus.ACCEPTED,
    customCode: "S00000",
  },
  CODE_INTERNAL_ERROR: {
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    customCode: "X00000",
  },
  ERR_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E00000",
  },
  ERR_API_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E00001",
  },
  ERR_SERVICE_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E00002",
  },
  ERR_ACCESS_TOKEN_MISSING: {
    httpCode: HttpStatus.FORBIDDEN,
    customCode: "E01000",
  },
  ERR_ACCESS_TOKEN_INVALID: {
    httpCode: HttpStatus.UNAUTHORIZED,
    customCode: "E01001",
  },
  ERR_GRANT_TYPE_INVALID: {
    httpCode: HttpStatus.FORBIDDEN,
    customCode: "E01002",
  },
  ERR_AUTHENTICATE_FAILED: {
    httpCode: HttpStatus.UNAUTHORIZED,
    customCode: "E01003",
  },
  ERR_CONTENT_TYPE_INVALID: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E02000",
  },
  ERR_CONTENT_DATA_INVALID: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E02001",
  },
  ERR_UNSUPPORTED_METHOD: {
    httpCode: HttpStatus.METHOD_NOT_ALLOWED,
    customCode: "E02002",
  },
  ERR_QUERY_STRING: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E02003",
  },
  ERR_RECIPIENT_MISSING: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E03000",
  },
  ERR_FILE_MISSING: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E03001",
  },
  ERR_PHONE_INVALID: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E03002",
  },
  ERR_QUOTA_LIMIT: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E03003",
  },
  ERR_OTP_MISMATCH_MISMATCH: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04000",
  },
  ERR_PIN: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04001",
  },
  ERR_FRAUD: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04002",
  },
  ERR_BLACK_LIST: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04003",
  },
  ERR_WHITE_LIST: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04004",
  },
  ERR_MAX_REDEEM: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04005",
  },
  ERR_CUSTOMER_TYPE: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04006",
  },
  ERR_LOS: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04007",
  },
  ERR_MAX_REDEEM_PERIOD: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E04008",
  },
  ERR_DATA_VERSIONING: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E07000",
  },
  ERR_DATA_EXISTS: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E07001",
  },
  ERR_VOUCHER_EMPTY: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E70003",
  },
  ERR_VOUCHER_EXPIRED: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E70004",
  },
  ERR_KEYWORD_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E10001",
  },
  ERR_MERCHANT_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E10002",
  },
  ERR_VOUCHER_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E10003",
  },
  ERR_VOUCHER_VERIFIED: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E70001",
  },
  ERR_MSISDN_INVALID: {
    httpCode: HttpStatus.BAD_REQUEST,
    customCode: "E70002",
  },
  ERR_KEYWORD_MAIN_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E10004",
  },
  ERR_PROGRAM_MAIN_NOT_FOUND: {
    httpCode: HttpStatus.NOT_FOUND,
    customCode: "E10005",
  },
  UNKNOWN_ERROR: {
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    customCode: "-",
  },
}
