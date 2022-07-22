import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from 'src/app/domain/player/dtos/create-player.dto';
import { UpdatePlayerDto } from 'src/app/domain/player/dtos/update-player.dto';
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
    try {
      const player = await this.playersRepository
        .createQueryBuilder('players')
        .leftJoinAndSelect('players.subscription', 'subscription')
        .where('players.id = :id', { id })
        .getOne();

      return player;
    } catch (error) {
      throw new NotFoundException(`Player not found: ${error.message}`);
    }
  }

  private async findPlayerByEmail(email: string): Promise<PlayerEntity> {
    return await this.playersRepository.findOne({ where: { email } });
  }

  public async findAllPlayers(): Promise<PlayerEntity[]> {
    return await this.playersRepository.find();
  }

  public async updatePlayer(id: string, data: UpdatePlayerDto) {
    try {
      const player = await this.findPlayerById(id);
      this.playersRepository.merge(player, data);
      return await this.playersRepository.save(player);
    } catch (error) {
      throw new NotFoundException(`Player not found: ${error.message}`);
    }
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
