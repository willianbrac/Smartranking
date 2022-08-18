import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { SubscriptionEntity } from 'src/app/domain/subscription/entities/subscription.entity';
import { SubscriptionsService } from 'src/app/domain/subscription/subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  public constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async createSubscription(
    @Query('playerId', new ParseUUIDPipe()) playerId: string,
    @Query('tournamentId', new ParseUUIDPipe()) tournamentId: string,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionsService.createSubscription({
      playerId,
      tournamentId,
    });
  }
}
