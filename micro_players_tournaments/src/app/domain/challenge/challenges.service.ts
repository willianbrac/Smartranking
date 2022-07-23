import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChallengeDto } from 'src/app/domain/challenge/dtos/create-challenge.dto';
import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';
import { PlayersService } from 'src/app/domain/player/players.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengesService {
  public constructor(
    @InjectRepository(ChallengeEntity)
    private readonly challengesRepository: Repository<ChallengeEntity>,
    private readonly playersService: PlayersService,
  ) {}

  // Function temporary
  public async createChallenge(body: CreateChallengeDto) {
    const { players, createByPlayer } = body;

    const player1 = await this.playersService.findPlayerById(players[0]);
    const player2 = await this.playersService.findPlayerById(players[1]);
    if (!player1 || !player2)
      throw new NotFoundException('One or more players are not registered');

    const newChallenge = this.challengesRepository.create({
      players: [player1, player2],
      createByPlayer,
    });
    await newChallenge.save();
    return newChallenge;
  }
}
