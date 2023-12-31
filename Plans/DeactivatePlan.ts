import type { Example } from '../types/General'
import Paypal from '../utils/Axios'

/**
 * Deactivates a plan, by ID.
 */
const DeactivatePlan = async (planId: string): Promise<void> => {
	try {
		return await Paypal.post(`/billing/plans/${planId}/deactivate`)
	} catch (error) {
		throw error
	}
}

export const description = 'Deactivates a plan, by ID.'

export const examples: Example[] = [
	{
		description: 'Deactivates a plan ID "P-XXX"',
		code: `DeactivatePlan('P-XXX')`,
	},
]

export default DeactivatePlan
