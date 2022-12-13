import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { UrlsModule } from './urls/urls.module'
import { ApiModule } from './api/api.module'

@Module({
  imports: [UsersModule, DatabaseModule, UrlsModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
