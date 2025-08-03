// User Messages Controller

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-user-message.dto';
import { UserMessageService } from './user-messages.service';

@Controller('user-messages')
export class UserMessagesController {
  constructor(private readonly messageService: UserMessageService) {
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll(@Query('page') page:string = '1',@Query('limit') limit:string = '3',) {
    return this.messageService.findAll(+page, +limit);
  }
}
