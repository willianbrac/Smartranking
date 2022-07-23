import { ChallengeStatus } from 'src/app/domain/challenge/util/challenge-status.enum';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

@Entity('challenges')
export class ChallengeEntity extends CustomBaseEntity {
  //bideritional relation
  @ManyToOne(() => PlayerEntity, (player) => player.challenges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'challenges_players',
    joinColumn: { name: 'challengeId' },
    inverseJoinColumn: { name: 'playerId' },
  })
  players: PlayerEntity[];

  @Column({ type: 'varchar' })
  createByPlayer: string;

  @Column({
    type: 'enum',
    enum: ChallengeStatus,
    default: ChallengeStatus.PENDING,
  })
  status: string;
}
