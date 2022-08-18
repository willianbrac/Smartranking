import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersService } from 'src/app/domain/player/players.service';
import { CreateSubscriptionDto } from 'src/app/domain/subscription/dtos/create-subscription.dto';
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { TournamentsService } from 'src/app/domain/tournament/tournaments.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  public constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
    private readonly playersService: PlayersService,
    private readonly tournamentsService: TournamentsService,
  ) {}

  public async createSubscription({
    playerId,
    tournamentId,
  }: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    const tournament = await this.tournamentsService.findTournamentById(
      tournamentId,
    );
    const player = await this.playersService.findPlayerById(playerId);
    const subscription = await this.playerAlreadyRegisteredOnTournament(
      playerId,
      tournamentId,
    );
    if (!tournament) throw new NotFoundException('Tournament not found!');
    if (!player) throw new NotFoundException('Player not found!');
    if (subscription)
      throw new NotFoundException('Player already registered on tournament!');

    const newSubscription = this.subscriptionsRepository.create({
      player,
      tournament,
    });

    await newSubscription.save();

    return newSubscription;
  }

  private async playerAlreadyRegisteredOnTournament(
    playerId: string,
    tournamentId: string,
  ): Promise<SubscriptionEntity> {
    const subscriptionAlreadExists = await this.subscriptionsRepository
      .createQueryBuilder('subscriptions')
      .where('subscriptions.playerId = :playerId', { playerId })
      .andWhere('subscriptions.tournamentId = :tournamentId', {
        tournamentId,
      })
      .getOne();

    return subscriptionAlreadExists;
  }
}
