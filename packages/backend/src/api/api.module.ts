import { Module } from '@nestjs/common'
import { ApiUrlsModule } from './urls/urls.module'

@Module({
  imports: [ApiUrlsModule],
})
export class ApiModule {}
