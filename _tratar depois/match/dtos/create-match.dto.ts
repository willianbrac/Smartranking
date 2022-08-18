import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateMatchDto extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  challenge: string;

  @IsOptional()
  @IsString()
  winner: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsNumber()
  punctuation: number;
}
