import { Controller, Request, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'

@Controller('auth')
export class AuthController {
  @Get('/login')
  @UseGuards(AuthGuard('discord'))
  async login(@Request() req: FastifyRequest) {
    console.log(req.context)
  }
}
