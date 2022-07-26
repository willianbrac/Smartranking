import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateChallengeDto extends BaseEntity {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: string[];

  @IsString()
  @IsNotEmpty()
  createByPlayer: string;
}
