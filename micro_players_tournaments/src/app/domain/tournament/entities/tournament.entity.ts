/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('tournaments')
export class TournamentEntity extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  // um torneio pode ter muitos jogadores
  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.tournament, {
    onDelete: "CASCADE"
  })
  subscriptions: SubscriptionEntity[];
}
