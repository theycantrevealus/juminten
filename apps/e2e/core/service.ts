import { HttpService } from "@nestjs/axios"
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common"
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { firstValueFrom } from "rxjs"
import { DTOSignIn } from "../../gateway_main/src/oauth/oauth.dto.signin"
import { WINSTON_MODULE_PROVIDER } from "@module/logger/constant"
import { Logger } from "winston"
import { CoreResponse } from "@shared/interface/core.response"

@Injectable()
export class CoreService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly http: HttpService,
  ) {}

  onModuleInit() {
    const axios = this.http.axiosRef

    axios.interceptors.request.use((config: any) => {
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

  async get<T>(path: string, params?: any): Promise<T> {
    return (await firstValueFrom(this.http.get<T>(path, { params }))).data
  }

  async post<T>(path: string, body: any): Promise<T> {
    return (await firstValueFrom(this.http.post<T>(path, body))).data
  }

  async signIn<T>(payload: DTOSignIn): Promise<T> {
    try {
      const response: CoreResponse = await this.post(
        "/gateway/v3.0/oauth/signin",
        payload,
      )
      return response.payload
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async earnInject<T>(payload: any): Promise<T> {
    return await this.post("/gateway/v3.0/earn", payload)
  }
}
