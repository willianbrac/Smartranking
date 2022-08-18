import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from 'src/app/domain/player/dtos/create-player.dto';
import { PlayerEntity } from 'src/app/domain/player/entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  public constructor(
    @InjectRepository(PlayerEntity)
    private readonly playersRepository: Repository<PlayerEntity>,
  ) {}

  public async createPlayer(data: CreatePlayerDto) {
    const { email, phone } = data;

    const player = await this.findPlayerByEmail(email);
    if (player) throw new NotFoundException('Player alread exists!');

    const newPlayer = this.playersRepository.create({
      email,
      phone,
    });
    await this.playersRepository.save(newPlayer);

    return newPlayer;
  }

  public async findPlayerById(id: string): Promise<PlayerEntity | any> {
    const player = await this.playersRepository
      .createQueryBuilder('players')
      .leftJoinAndSelect('players.subscription', 'subscription')
      .where('players.id = :id', { id })
      .getOne();
    if (!player) throw new NotFoundException(`Player not found!`);
    return player;
  }

  private async findPlayerByEmail(email: string): Promise<PlayerEntity> {
    return await this.playersRepository.findOne({ where: { email } });
  }

  public async findAllPlayers(): Promise<PlayerEntity[]> {
    const players = await this.playersRepository.find();
    return players;
  }

  public async deletePlayerById(id: string): Promise<void> {
    try {
      await this.findPlayerById(id);
      await this.playersRepository.softDelete(id);
    } catch (error) {
      throw new NotFoundException(`Player not found: ${error.message}`);
    }
  }
}
