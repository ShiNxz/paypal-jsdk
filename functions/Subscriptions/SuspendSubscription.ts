import type { Example } from '@/@types'
import Paypal from '@/utils/Axios'

/**
 * Suspends the subscription.
 * @param subId The ID of the subscription to suspend.
 * @param reason The reason for suspenson of the subscription.
 **/
const SuspendSubscription = async (subId: string, reason: string): Promise<void> => {
	try {
		await Paypal.post(`/billing/subscriptions/${subId}/suspend`, {
			reason,
		})
	} catch (error) {
		throw error
	}
}

export const description = 'Suspends the subscription.'

export const examples: Example[] = [
	{
		description: 'Creates a subscription',
		code: `await SuspendSubscription('P-XXX', 'Reason...')`,
	},
]

export default SuspendSubscription
