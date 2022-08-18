import { ChallengeEntity } from 'src/app/domain/challenge/entities/challenge.entity';
import { ScoreboardStatus } from 'src/app/domain/match/util/scoreboard-status.enum';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('matchs')
export class MatchEntity extends CustomBaseEntity {
  @OneToOne(() => PlayerEntity, (player) => player.challenges)
  challenge: ChallengeEntity;

  @Column({ nullable: true })
  winner: PlayerEntity;

  @Column({
    type: 'enum',
    enum: ScoreboardStatus,
    nullable: false,
  })
  result: string;

  @Column({ nullable: false })
  punctuation: number;
}
