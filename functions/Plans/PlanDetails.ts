import type { CreatedPlan } from '@/@types/plans'
import type { Example } from '@/@types'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a plan, by ID.
 */
const PlanDetails = async (planId: string): Promise<CreatedPlan> => {
	try {
		const { data } = await Paypal.get<CreatedPlan>(`/billing/plans/${planId}`)

		return data
	} catch (error) {
		throw error
	}
}

const description = 'Shows details for a plan, by ID.'

const examples: Example[] = [
	{
		description: 'Shows details for the plan with ID "P-XXX"',
		code: `PlanDetails('P-XXX')`,
	},
]

export default PlanDetails
