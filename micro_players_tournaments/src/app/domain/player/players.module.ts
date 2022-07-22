import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { PlayersController } from 'src/app/domain/player/players.controller';
import { PlayersService } from 'src/app/domain/player/players.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
