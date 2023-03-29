import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import configurations from './config/configurations';
import { configurationsSchemaValidation } from './config/configurations.schema';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validationSchema: configurationsSchemaValidation,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
