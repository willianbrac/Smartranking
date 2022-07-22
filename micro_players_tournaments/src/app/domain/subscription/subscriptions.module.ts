import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from 'src/app/domain/player/players.module';
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { SubscriptionsController } from 'src/app/domain/subscription/subscription.controller';
import { SubscriptionsService } from 'src/app/domain/subscription/subscriptions.service';
import { TournamentsModule } from 'src/app/domain/tournament/tournaments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity]),
    PlayersModule,
    TournamentsModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
