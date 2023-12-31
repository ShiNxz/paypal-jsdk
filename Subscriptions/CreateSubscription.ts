import type { Example } from '../types/General'
import type { CreateSubscriptionBody as CreateSubscriptionBodyType, CreatedSubscription } from '../types/Subscriptions'
import { CreateSubscriptionBody } from '../schemas/Subscriptions'
import Paypal from '../utils/Axios'

/**
 * Creates a subscription.
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

export const description = 'Creates a subscription.'

export const examples: Example[] = [
	{
		description: 'Creates a subscription',
		code: `const newSub = await CreateSubscription('P-XXX')`,
	},
	{
		description: 'Creates a subscription with optional parameters and get the payment url',
		code: `const { paymentUrl } = await CreateSubscription('P-4LD7587879155310YMTUM7PA')`,
	},
]

export default CreateSubscription
