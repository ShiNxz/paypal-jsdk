import type { Example } from '@/@types'
import Paypal from '@/utils/Axios'

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
const CancelSubscription = async (subId: string, reason: string): Promise<void> => {
	try {
		await Paypal.post(`/billing/subscriptions/${subId}/cancel`, {
			reason,
		})
	} catch (error) {
		throw error
	}
}

export const description = 'Cancels the subscription.'

export const examples: Example[] = [
	{
		description: 'Cancel a subscription',
		code: `await CancelSubscription('P-XXX', 'Reason...')`,
	},
]

export default CancelSubscription
