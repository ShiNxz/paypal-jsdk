import type { CreatedPlan } from '@/@types/plans'
import { PricingScheme } from '@/schemas/Plans'
import { z } from 'zod'
import Paypal from '@/utils/Axios'

const PricingSchemas = z.array(
	z.object({
		billing_cycle_sequence: z.number(),
		pricing_scheme: PricingScheme,
	})
)

type PricingSchemas = z.infer<typeof PricingSchemas>

/**
 * Updates pricing for a plan.
 * For example, you can update a regular billing cycle from $5 per month to $7 per month.
 * @param planId The ID of the plan to update pricing for.
 * @param newPricing The new pricing schemes.
 *
 * @example
 * ```typescript
 * await Plans.updatePricing('P-4LD7587879155310YMTUM7PA', [
 * 	{
 * 		billing_cycle_sequence: 1,
 * 		pricing_scheme: {
 * 			fixed_price: {
 * 				value: '14.00',
 * 				currency_code: 'USD'
 * 			}
 * 		}
 * 	},
 * ])
 * ```
 */
const UpdatePlanPricing = async (planId: string, newPricing: PricingSchemas): Promise<CreatedPlan> => {
	try {
		const pricing_schemes = PricingSchemas.parse(newPricing)

		const { data } = await Paypal.post(`/billing/plans/${planId}/update-pricing-schemes`, {
			pricing_schemes,
		})

		return data
	} catch (error) {
		throw error
	}
}

export default UpdatePlanPricing
