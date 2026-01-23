import { CoreOauthService } from "apps/integration/core/oauth.service"
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { AuthGuard } from "@nestjs/passport"
import { environmentName } from "@shared/environment"

@Injectable()
export class OAuth2Guard extends AuthGuard("jwt") {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,

    @Inject(ConfigService) private readonly configService: ConfigService,

    private readonly coreOAuthService: CoreOauthService,
  ) {
    super()
  }

  /**
   * @function canActivate
   * Guard used to integrater authentication feature from core. It check the given token from endpoint that use Authorization decorator
   *
   * @param context
   * @returns
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      "secured",
      context.getHandler(),
    )

    if (!secured) {
      return true
    }

    const http = context.switchToHttp()
    const request = http.getRequest()
    const token = request.headers.authorization

    if (!token) {
      throw new ForbiddenException([{ isTokenMissing: "Token is Required" }])
    }

    let account

    if (environmentName === "development") {
      await this.coreOAuthService.authenticateBusiness(token).then((data) => {
        //
      })
    } else {
      //
    }

    return false
  }
}
