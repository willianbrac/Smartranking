/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('players')
export class PlayerEntity extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  photoUrl: string;

  // um jogador participa ou não de um torneio
  @OneToOne(() => SubscriptionEntity, (subscription) => subscription.player, {
    onDelete: "CASCADE",
  })
  subscription: SubscriptionEntity;
}
