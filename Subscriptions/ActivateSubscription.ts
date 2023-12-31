import type { Example } from '../types/General'
import Paypal from '../utils/Axios'

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
const ActivateSubscription = async (subId: string, reason?: string): Promise<void> => {
	try {
		await Paypal.post(`/billing/subscriptions/${subId}/activate`, {
			reason,
		})
	} catch (error) {
		throw error
	}
}

export const description = 'Activate the subscription.'

export const examples: Example[] = [
	{
		description: 'Activate a subscription',
		code: `await ActivateSubscription('P-XXX')`,
	},
]

export default ActivateSubscription
