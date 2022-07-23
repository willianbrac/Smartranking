import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateChallengeDto extends BaseEntity {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: string[];

  @IsString()
  createByPlayer: string;
}
