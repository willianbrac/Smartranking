import { Body, Controller, Post } from '@nestjs/common';
import { CreateMatchDto } from 'src/app/domain/match/dtos/create-match.dto';
import { MatchEntity } from 'src/app/domain/match/entities/match.entity';
import { MatchsService } from 'src/app/domain/match/matchs.service';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  async createChallenge(@Body() body: CreateMatchDto): Promise<MatchEntity> {
    return await this.matchsService.createMatch(body);
  }
}
