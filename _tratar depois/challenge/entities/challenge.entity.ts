import { ChallengeStatus } from 'src/app/domain/challenge/util/challenge-status.enum';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('challenges')
export class ChallengeEntity extends CustomBaseEntity {
  @ManyToMany(() => PlayerEntity, (player) => player.challenges)
  @JoinTable({
    name: 'challenges_players',
    joinColumn: { name: 'challengeId' },
    inverseJoinColumn: { name: 'playerId' },
  })
  players: PlayerEntity[];

  @Column({ type: 'varchar', nullable: false })
  playerChallenger: PlayerEntity;

  @Column({
    type: 'enum',
    enum: ChallengeStatus,
    default: ChallengeStatus.PENDING,
  })
  status: string;
}
