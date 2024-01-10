import Paypal from '@/utils/Axios'

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 *
 * @example
 * ```typescript
 * await Subscriptions.cancel('P-XXX', 'Reason...')
 * ```
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

export default CancelSubscription
