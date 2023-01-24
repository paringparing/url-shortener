import { Controller, Request, Get, UseGuards, Query } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

@Controller('auth')
export class AuthController {
  @Get('/login')
  async login(@Request() req: FastifyRequest, @Query('code') code: string) {
    console.log(code)
  }
}
