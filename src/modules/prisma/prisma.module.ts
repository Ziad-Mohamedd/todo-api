import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { configurationsSchemaValidation } from '../../config/configurations.schema';
import configurations from '../../config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validationSchema: configurationsSchemaValidation,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
