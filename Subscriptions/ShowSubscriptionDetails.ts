import type { Example } from '../types/General'
import type { CreatedSubscription } from '../types/Subscriptions'
import Paypal from '../utils/Axios'

/**
 * Shows details for a subscription, by ID.
 */
const ShowSubscriptionDetails = async (
	subId: string,
	params?: Record<string, string>
): Promise<CreatedSubscription> => {
	try {
		const { data } = await Paypal.get<CreatedSubscription>(`/billing/subscriptions/${subId}`, {
			params,
		})

		return data
	} catch (error) {
		throw error
	}
}

export const description = 'Shows details for a subscription, by ID.'

export const examples: Example[] = [
	{
		description: 'Shows details for a subscription, by ID.',
		code: `const details = await ShowSubscriptionDetails('I-XXX')`,
	},
]

export default ShowSubscriptionDetails
