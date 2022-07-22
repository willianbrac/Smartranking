import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersService } from 'src/app/domain/player/players.service';
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { TournamentsService } from 'src/app/domain/tournament/tournaments.service';
import { Repository } from 'typeorm';

interface ICreateSubscriptionsParams {
  player_id: string;
  tournament_id: string;
}
@Injectable()
export class SubscriptionsService {
  public constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
    private readonly playersService: PlayersService,
    private readonly tournamentsService: TournamentsService,
  ) {}

  public async createSubscription({
    player_id,
    tournament_id,
  }: ICreateSubscriptionsParams): Promise<SubscriptionEntity> {
    const tournament = await this.tournamentsService.findTournamentById(
      tournament_id,
    );
    const player = await this.playersService.findPlayerById(player_id);
    const subscription = await this.playerAlreadyRegisteredOnTournament(
      player_id,
      tournament_id,
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
    player_id: string,
    tournament_id: string,
  ): Promise<SubscriptionEntity> {
    const subscriptionAlreadExists = await this.subscriptionsRepository
      .createQueryBuilder('subscriptions')
      .where('subscriptions.playerId = :player_id', { player_id })
      .andWhere('subscriptions.tournamentId = :tournament_id', {
        tournament_id,
      })
      .getOne();

    return subscriptionAlreadExists;
  }
}
