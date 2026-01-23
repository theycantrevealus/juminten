import { HttpService } from "@nestjs/axios"
import { Inject, Injectable } from "@nestjs/common"
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { firstValueFrom } from "rxjs"
import { WINSTON_MODULE_PROVIDER } from "@module/logger/constant"
import { Logger } from "winston"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class CoreService {
  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,

    protected readonly http: HttpService,
  ) {}

  onModuleInit() {
    const axios = this.http.axiosRef

    axios.interceptors.request.use((config: any) => {
      config.headers = { ...config.headers, "Content-Type": "application/json" }
      return config
    })

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, message } = response.data
        this.logger.verbose(
          `${response.status} ${response.config.url} ${code} ${message}`,
          "CoreService",
        )

        return response
      },
      (error: AxiosError) => {
        this.logger.error(
          `[ERROR] ${error.config?.url} ${error.response}`,
          "CoreService",
        )

        return Promise.reject(error)
      },
    )
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return (await firstValueFrom(this.http.get<T>(path, config))).data
  }

  async post<T>(path: string, body: any): Promise<T> {
    return (await firstValueFrom(this.http.post<T>(path, body))).data
  }
}
