import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateTournamentDto } from 'src/app/domain/tournament/dtos/create-tournament.dto';
import { TournamentEntity } from 'src/app/domain/tournament/entities/tournament.entity';
import { TournamentsService } from 'src/app/domain/tournament/tournaments.service';

@Controller('tournament')
export class TournamentsController {
  public constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  public async createTournament(
    @Body() tournamentData: CreateTournamentDto,
  ): Promise<TournamentEntity> {
    return await this.tournamentsService.createTournament(tournamentData);
  }

  @Get()
  public async findAllTournaments(): Promise<TournamentEntity[]> {
    return await this.tournamentsService.getAllTournaments();
  }

  @Get('/:id')
  public async findTournamentById(
    @Param('id', new ParseUUIDPipe()) Id: string,
  ): Promise<TournamentEntity> {
    return await this.tournamentsService.findTournamentById(Id);
  }
}
