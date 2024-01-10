import { CreatedSubscription, ReviseSubscriptionBody } from '@/@types/subscriptions'
import { CreateSubscriptionBody } from '@/schemas/Subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Updates the quantity of the product or service in a subscription.
 * You can also use this method to switch the plan and update the shipping_amount, shipping_address values for the subscription.
 * This type of update requires the buyer's consent.
 * @param subId The ID of the subscription.
 * @param options The options for the subscription.
 *
 * @example
 * ```typescript
 * await Subscriptions.revisePlan('I-XXX', {
 * 	plan_id: 'P-XXX',
 * 	shipping_amount: {
 * 		currency_code: 'USD',
 * 		value: '10.00',
 * 	},
 * 	shipping_address: {
 * 		address_line_1: '123 Townsend St',
 * 		address_line_2: 'Floor 6',
 * 		admin_area_2: 'San Francisco',
 * 		admin_area_1: 'CA',
 * 		postal_code: '94107',
 * 		country_code: 'US',
 * 	},
 * })
 * ```
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

export default RevisePlan
