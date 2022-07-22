import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TournamentEntity } from 'src/app/domain/tournament/entities/tournament.entity';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  tournament: TournamentEntity;
}
