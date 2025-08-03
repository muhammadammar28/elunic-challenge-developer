// User Messages Service

import { UserMessage } from '../entities/user-message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-user-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly messageRepository: Repository<UserMessage>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<UserMessage> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }




  async findAll(page: number = 1, limit: number = 3): Promise<{ data: UserMessage[]; total: number; currentPage: number; totalPages: number }> {
    const [data, total] = await this.messageRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
