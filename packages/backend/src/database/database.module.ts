import { Module } from '@nestjs/common'
import { DI } from 'src/utils/DI'
import { edgedbClient } from './client'

@Module({
  providers: [
    {
      provide: DI.EdgeDB,
      useValue: edgedbClient,
    },
  ],
  exports: [DI.EdgeDB],
})
export class DatabaseModule {}
