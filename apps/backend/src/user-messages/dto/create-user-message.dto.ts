// Create User Message DTO

import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

