import { IsNotEmpty, IsString } from 'class-validator';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  players: PlayerEntity[];
}
