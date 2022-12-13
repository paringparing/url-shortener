import { Module } from '@nestjs/common'
import { UrlsController } from './urls.controller'
import { UrlsModule } from 'src/urls/urls.module'

@Module({
  controllers: [UrlsController],
  imports: [UrlsModule],
})
export class ApiUrlsModule {}
