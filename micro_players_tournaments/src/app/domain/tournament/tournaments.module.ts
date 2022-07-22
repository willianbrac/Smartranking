import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/app/domain/tournament/entities/tournament.entity';
import { TournamentsController } from 'src/app/domain/tournament/tournaments.controller';
import { TournamentsService } from 'src/app/domain/tournament/tournaments.service';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
  exports: [TournamentsService],
})
export class TournamentsModule {}
