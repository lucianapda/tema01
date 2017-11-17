import { SubscriptionDTO } from './../../../../model/subscription/subscription.dto';
import { BaseDTO } from '../../../../model/base/base.dto';
import { EventDTO } from '../../../../model/event/event.dto';


export class SubscriptionFormDTO extends BaseDTO {
    event: EventDTO = new EventDTO();
    currentSubscription : SubscriptionDTO = new SubscriptionDTO();
    subscriptions: SubscriptionDTO[] = [];
}