import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengesService {
  public constructor(
    @InjectRepository(ChallengeEntity)
    private readonly challengesRepository: Repository<ChallengeEntity>,
  ) {}
}
