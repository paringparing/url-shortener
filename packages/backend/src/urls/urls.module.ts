import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UrlsService } from './urls.service'

@Module({
  providers: [UrlsService],
  imports: [DatabaseModule],
})
export class UrlsModule {}
