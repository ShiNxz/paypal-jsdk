import type { Example } from '../types/General'
import Paypal from '../utils/Axios'

/**
 * Activates a plan, by ID.
 */
const ActivatePlan = async (planId: string): Promise<void> => {
	try {
		return await Paypal.post(`/billing/plans/${planId}/activate`)
	} catch (error) {
		throw error
	}
}

export const description = 'Activates a plan, by ID.'

export const examples: Example[] = [
	{
		description: 'Activates a plan ID "P-XXX"',
		code: `ActivatePlan('P-XXX')`,
	},
]

export default ActivatePlan
