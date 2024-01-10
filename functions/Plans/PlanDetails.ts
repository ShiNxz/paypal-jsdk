import type { CreatedPlan } from '@/@types/plans'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a plan, by ID.
 * @param planId The ID of the plan to show details for.
 *
 * @example
 * ```typescript
 * const plan = await Plans.details('P-XXX')
 * ```
 */
const PlanDetails = async (planId: string): Promise<CreatedPlan> => {
	try {
		const { data } = await Paypal.get<CreatedPlan>(`/billing/plans/${planId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default PlanDetails
