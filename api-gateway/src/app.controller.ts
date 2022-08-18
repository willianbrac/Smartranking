import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePlayerDto } from './dtos/create-player.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('smartranking')
export class AppController {
  private logger = new Logger(AppController.name);
  private clientBackend: ClientProxy;

  constructor(configService: ConfigService) {
    this.clientBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('RABBITMQ_CLUSTER_URI')],
        queue: configService.get('RABBITMQ_CLUSTER_QUEUE'),
      },
    });
  }

  @Post()
  createPlayer(@Body() data: CreatePlayerDto) {
    return this.clientBackend.emit('create-player', data);
  }
}
