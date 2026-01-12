import { HttpService } from "@nestjs/axios"
import { Injectable, Logger } from "@nestjs/common"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { firstValueFrom } from "rxjs"
import { DTOSignIn } from "../../gateway_main/src/oauth/oauth.dto.signin"

@Injectable()
export class CoreService {
  private readonly logger = new Logger("CoreGatewayHttp")

  constructor(private readonly http: HttpService) {}

  onModuleInit() {
    const axios = this.http.axiosRef

    axios.interceptors.request.use((config: any) => {
      this.logger.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    })

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        this.logger.log(`[RESPONSE] ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        this.logger.error(`[ERROR] ${error.config?.url}`, error.response?.data)
        return Promise.reject(error)
      },
    )
  }

  async get<T>(path: string, params?: any): Promise<T> {
    const res = await firstValueFrom(this.http.get<T>(path, { params }))
    return res.data
  }

  async post<T>(path: string, body: any): Promise<T> {
    const res = await firstValueFrom(this.http.post<T>(path, body))
    return res.data
  }

  async signIn<T>(payload: DTOSignIn): Promise<T> {
    return await this.post("/gateway/v3.0/oauth/signin", payload)
  }

  async earnInject<T>(payload: any): Promise<T> {
    return await this.post("/gateway/v3.0/earn", payload)
  }
}
