import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ChallengesService } from 'src/app/domain/challenge/challenges.service';
import { CreateChallengeDto } from 'src/app/domain/challenge/dtos/create-challenge.dto';
import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async createChallenge(
    @Body() body: CreateChallengeDto, ///break point
  ): Promise<ChallengeEntity> {
    return await this.challengesService.createChallenge(body);
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ChallengeEntity[]> {
    return await this.challengesService.findChallengesByPlayerId(id);
  }
}
