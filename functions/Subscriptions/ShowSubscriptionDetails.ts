import type { CreatedSubscription } from '@/@types/subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a subscription, by ID.
 * @param subId The ID of the subscription.
 * @param params The query parameters to include in the request.
 *
 * @example
 * ```typescript
 * const details = await Subscriptions.showDetails('I-XXX')
 * ```
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

export default ShowSubscriptionDetails
