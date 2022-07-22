import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from 'src/app/domain/player/dtos/create-player.dto';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { PlayersService } from 'src/app/domain/player/players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() body: CreatePlayerDto): Promise<PlayerEntity> {
    return await this.playersService.createPlayer(body);
  }

  @Get()
  async findAll(): Promise<PlayerEntity[]> {
    return await this.playersService.findAllPlayers();
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PlayerEntity> {
    return await this.playersService.findPlayerById(id);
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.playersService.deletePlayerById(id);
  }
}
