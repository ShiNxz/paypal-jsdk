import Paypal from '@/utils/Axios'

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 *
 * @example
 * ```typescript
 * await Subscriptions.activate('P-XXX')
 * ```
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

export default ActivateSubscription
