import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import configurations from './config/configurations';
import { configurationsSchemaValidation } from './config/configurations.schema';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validationSchema: configurationsSchemaValidation,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
