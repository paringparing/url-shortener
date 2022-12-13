import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(3000)
}
bootstrap()
