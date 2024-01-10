import type { CreateSubscriptionBody as CreateSubscriptionBodyType, CreatedSubscription } from '@/@types/subscriptions'
import { CreateSubscriptionBody } from '@/schemas/Subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Creates a subscription.
 * @param plan_id The ID of the plan to subscribe to.
 * @param options The request body.
 *
 * @example
 * ```typescript
 * const newSub = await Subscriptions.create('P-XXX')
 * const { paymentUrl } = newSub
 * ```
 */
const CreateSubscription = async (
	plan_id: string,
	options?: CreateSubscriptionBodyType
): Promise<CreatedSubscription> => {
	try {
		const body = CreateSubscriptionBody.parse(options ?? {})

		const { data } = await Paypal.post<CreatedSubscription>(`/billing/subscriptions`, {
			plan_id: plan_id,
			...body,
		})

		const paymentUrl = data.links ? data.links.find((link) => link.rel === 'approve')?.href || null : null

		return { ...data, paymentUrl }
	} catch (error) {
		throw error
	}
}

export default CreateSubscription
