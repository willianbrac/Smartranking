import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChallengeDto } from 'src/app/domain/challenge/dtos/create-challenge.dto';
import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';
import { PlayersService } from 'src/app/domain/player/players.service';
import { Repository } from 'typeorm';

@Injectable()
export class MatchsService {
  public constructor(
    @InjectRepository(ChallengeEntity)
    private readonly challengesRepository: Repository<ChallengeEntity>,
    private readonly playersService: PlayersService,
  ) {}

  // Function temporary
  public async createMatch(body: CreateChallengeDto) {
    const { players, playerChallenger } = body;

    const player1 = await this.playersService.findPlayerById(players[0]);
    const player2 = await this.playersService.findPlayerById(players[1]);

    if (players[0] === players[1])
      throw new NotFoundException('Player must not challenge himself');

    if (!player1 || !player2)
      throw new NotFoundException('One or more players are not registered');

    const newChallenge = this.challengesRepository.create({
      players: [player1, player2],
      playerChallenger,
    });
    await newChallenge.save();
    return newChallenge;
  }

  public async findChallengesByPlayerId(
    id: string,
  ): Promise<ChallengeEntity[]> {
    const player = this.playersService.findPlayerById(id);
    if (!player) throw new NotFoundException('Player not found!');

    const challengesByPlayer = await this.challengesRepository
      .createQueryBuilder('challenges')
      .leftJoin('challenges.players', 'players')
      .select(['challenges.id', 'challenges.status'])
      //add subquery
      .where('players.id = :id', { id })
      .getMany();

    if (!challengesByPlayer)
      throw new NotFoundException('Challenges not founds!');

    return challengesByPlayer;
  }
}
