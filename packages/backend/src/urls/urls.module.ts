import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UrlsService } from './urls.service'
import { UrlsController } from './urls.controller'

@Module({
  providers: [UrlsService],
  imports: [DatabaseModule],
  exports: [UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule {}
