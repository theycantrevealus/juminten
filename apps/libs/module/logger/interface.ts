import { Type } from "@nestjs/common"
import { ModuleMetadata } from "@nestjs/common/interfaces"
import { IAccount } from "@shared/interface/account.created_by"
import { Logger, LoggerOptions } from "winston"

export interface ILogging {
  ip: string
  path: string
  url: string
  method: string
  payload: any
  result: any
  takeTime: number
  account: IAccount
  time: Date
}

export type WinstonModuleOptions = LoggerOptions & {
  instance?: Logger
}

export type NestLikeConsoleFormatOptions = {
  colors?: boolean
  prettyPrint?: boolean
}

export interface WinstonModuleOptionsFactory {
  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions
}

export interface WinstonModuleAsyncOptions extends Pick<
  ModuleMetadata,
  "imports"
> {
  useFactory?: (
    ...args: any[]
  ) => Promise<WinstonModuleOptions> | WinstonModuleOptions
  inject?: any[]
  useClass?: Type<WinstonModuleOptionsFactory>
}
