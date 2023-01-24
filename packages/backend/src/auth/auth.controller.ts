import { Controller, Get, Query, Response } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { config } from 'src/utils/config'
import axios from 'axios'
import { RESTPostOAuth2AccessTokenResult, Routes } from 'discord-api-types/v10'

const discordApi = axios.create({
  baseURL: 'https://discord.com/api/v10',
})

@Controller('auth')
export class AuthController {
  @Get('/login')
  async login(@Response() res: FastifyReply, @Query('code') code: string) {
    if (!code) {
      res.redirect(
        301,
        `https://discord.com/api/oauth2/authorize?${new URLSearchParams({
          client_id: config.auth.discord.clientId,
          scope: 'identify',
          redirect_uri: config.auth.discord.redirectUri,
          response_type: 'code',
        })}`,
      )
      return
    }

    const { data: tokens } =
      await discordApi.post<RESTPostOAuth2AccessTokenResult>(
        Routes.oauth2TokenExchange(),
        new URLSearchParams({
          client_id: config.auth.discord.clientId,
          client_secret: config.auth.discord.clientSecret,
          redirect_uri: config.auth.discord.redirectUri,
          grant_type: 'authorization_code',
          code,
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )

    const accessToken = tokens.access_token
  }
}
