/* eslint-disable prettier/prettier */
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { TournamentEntity } from 'src/app/domain/tournament/entities/tournament.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity extends CustomBaseEntity {
  @ManyToOne(() => TournamentEntity, (tournament) => tournament.subscriptions, {
    nullable: false,
  })
  tournament: TournamentEntity;

  @OneToOne(() => PlayerEntity, (player) => player.subscription, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  player: PlayerEntity;
}
