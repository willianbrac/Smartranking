import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from 'src/app/domain/challenge/challenge.module';
import { PlayersModule } from 'src/app/domain/player/players.module';
import { SubscriptionsModule } from 'src/app/domain/subscription/subscriptions.module';
import { TournamentsModule } from 'src/app/domain/tournament/tournaments.module';
import { typeOrmConfig } from 'src/config/typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ChallengesModule,
    SubscriptionsModule,
    PlayersModule,
    TournamentsModule,
  ],
})
export class AppModule {}
