import { Module } from '@nestjs/common'
import { DiscordStrategy } from './discord.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, DiscordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
