import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { MessagesModule } from '../user-messages/user-messages.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
