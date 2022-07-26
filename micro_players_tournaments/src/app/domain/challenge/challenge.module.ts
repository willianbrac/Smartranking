import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesController } from 'src/app/domain/challenge/challenges.controller';
import { ChallengesService } from 'src/app/domain/challenge/challenges.service';
import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';
import { PlayersModule } from 'src/app/domain/player/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeEntity]), PlayersModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
