import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { SubscriptionsService } from 'src/app/domain/subscription/subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  public constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post('/:player_id/subscribe/:tournament_id')
  @UsePipes(ValidationPipe)
  public async createSubscription(
    @Param('player_id', new ParseUUIDPipe()) player_id: string,
    @Param('tournament_id', new ParseUUIDPipe()) tournament_id: string,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionsService.createSubscription({
      player_id,
      tournament_id,
    });
  }
}
