import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { BaseEntity } from 'typeorm';

export class CreateChallengeDto extends BaseEntity {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: string[];

  @IsString()
  @IsNotEmpty()
  playerChallenger: PlayerEntity;
}
