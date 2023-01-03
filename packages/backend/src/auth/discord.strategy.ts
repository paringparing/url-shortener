import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-discord'
import { config } from '../utils/config'
import { AuthService } from './auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: config.auth.discord.clientId,
      clientSecret: config.auth.discord.clientSecret,
      callbackURL: config.auth.discord.redirectUri,
      scope: 'identify',
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: { id: string; username: string },
  ) {
    try {
      const user = await this.authService.findOrCreateUser(
        profile.id,
        profile.username,
      )

      return user
    } catch {
      throw new UnauthorizedException()
    }
  }
}
