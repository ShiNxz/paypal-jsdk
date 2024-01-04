import type { CreatedPlan, PlanBody as PlanBodyType } from '@/@types/plans'
import type { Example } from '@/@types'
import { PlanBody } from '@/schemas/Plans'
import Paypal from '@/utils/Axios'

/**
 * Creates a plan that defines pricing and billing cycle details for subscriptions.
 */
const CreatePlan = async (body: PlanBodyType): Promise<CreatedPlan> => {
	try {
		const { product_id, name, billing_cycles, payment_preferences, quantity_supported, description, status } =
			PlanBody.parse(body)

		const { data } = await Paypal.post<CreatedPlan>(`/billing/plans`, {
			product_id,
			name,
			billing_cycles,
			payment_preferences,
			quantity_supported,
			description,
			status,
		})

		return data
	} catch (error) {
		throw error
	}
}

export const description = 'Creates a plan that defines pricing and billing cycle details for subscriptions.'

export const examples: Example[] = [
	{
		description: 'Creates a plan that defines pricing and billing cycle details for subscriptions.',
		code: `CreatePlan({
			product_id: 'PROD-XXX',
			name: 'Test Plan',
			description: 'Test Plan',
			billing_cycles: [
				{
					frequency: {
						interval_unit: 'MONTH',
						interval_count: 1,
					},
					tenure_type: 'REGULAR',
					sequence: 1,
					pricing_scheme: {
						fixed_price: {
							value: '10.00',
							currency_code: 'USD',
						},
					},
				},
			],
			payment_preferences: {
				setup_fee_failure_action: 'CANCEL',
			},
		})`,
	},
]

export default CreatePlan
