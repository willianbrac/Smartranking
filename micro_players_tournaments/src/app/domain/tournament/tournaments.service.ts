import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTournamentDto } from 'src/app/domain/tournament/dtos/create-tournament.dto';
import { TournamentEntity } from 'src/app/domain/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {
  public constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
  ) {}

  public async createTournament({
    name,
    description,
  }: CreateTournamentDto): Promise<TournamentEntity> {
    try {
      const tournamentAlreadExists = await this.findTournamentByName(name);
      if (tournamentAlreadExists)
        throw new BadRequestException('Tournament alread exists!');
      const tournament = this.tournamentRepository.create({
        name,
        description,
      });
      return await tournament.save();
    } catch (error) {
      throw new NotFoundException(
        `Error to create a tournament: ${error.message}`,
      );
    }
  }

  public async getAllTournaments(): Promise<TournamentEntity[]> {
    return await this.tournamentRepository.find();
  }

  public async findTournamentById(id: string): Promise<TournamentEntity> {
    try {
      const tournament = await this.tournamentRepository
        .createQueryBuilder('tournaments')
        .leftJoinAndSelect('tournaments.subscriptions', 'subscription')
        .where('tournaments.id = :id', { id })
        .getOne();

      return tournament;
    } catch (error) {
      throw new NotFoundException(`Tournament not found: ${error.message}`);
    }
  }

  private async findTournamentByName(name: string): Promise<TournamentEntity> {
    try {
      return await this.tournamentRepository.findOne({ where: { name } });
    } catch (error) {
      throw new NotFoundException(`Tournament not found: ${error.message}`);
    }
  }
}
