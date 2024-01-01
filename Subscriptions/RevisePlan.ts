import type { Example } from '../types/General'
import {
	CreateSubscriptionBody as CreateSubscriptionBodyType,
	CreatedSubscription,
	ReviseSubscriptionBody,
} from '../types/Subscriptions'
import { CreateSubscriptionBody } from '../schemas/Subscriptions'
import Paypal from '../utils/Axios'

/**
 * Updates the quantity of the product or service in a subscription.
 * You can also use this method to switch the plan and update the shipping_amount, shipping_address values for the subscription.
 * This type of update requires the buyer's consent.
 */
const RevisePlan = async (subId: string, options?: ReviseSubscriptionBody): Promise<CreatedSubscription> => {
	try {
		const body = CreateSubscriptionBody.parse(options ?? {})

		const { data } = await Paypal.post<CreatedSubscription>(`/billing/subscriptions/${subId}/revise`, body)

		return data
	} catch (error) {
		throw error
	}
}

export const description =
	'Updates the quantity of the product or service in a subscription. You can also use this method to switch the plan and update the shipping_amount, shipping_address values for the subscription. This type of update requires the buyers consent.'

export const examples: Example[] = [
	{
		description: '',
		code: ``,
	},
]

export default RevisePlan
