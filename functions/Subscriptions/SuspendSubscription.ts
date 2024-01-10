import Paypal from '@/utils/Axios'

/**
 * Suspends the subscription.
 * @param subId The ID of the subscription to suspend.
 * @param reason The reason for suspenson of the subscription.
 *
 * @example
 * ```typescript
 * await Subscriptions.suspend('P-XXX', 'Reason...')
 * ```
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

export default SuspendSubscription
