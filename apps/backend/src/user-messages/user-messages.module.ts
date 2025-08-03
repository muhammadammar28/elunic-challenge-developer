// User Messages Module

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessage } from '../entities/user-message.entity';
import { UserMessagesController } from './user-messages.controller';
import { UserMessageService } from './user-messages.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  controllers: [UserMessagesController],
  providers: [UserMessageService],
})
export class MessagesModule {}
