import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import passport from 'passport'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import { config } from './utils/config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  await app.register(fastifyCookie)

  await app.register(fastifySession, {
    secret: config.auth.secret,
  })

  await app.register(passport.initialize())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(3000)
}
bootstrap()
