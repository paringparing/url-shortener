import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { UrlsModule } from './urls/urls.module'
import { ApiModule } from './api/api.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module';
import * as path from 'path'

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    UrlsModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'frontend', 'dist'),
    }),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
