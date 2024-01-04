import type { Example } from '@/@types'
import Paypal from '@/utils/Axios'

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

const description = 'Deactivates a plan, by ID.'

const examples: Example[] = [
	{
		description: 'Deactivates a plan ID "P-XXX"',
		code: `DeactivatePlan('P-XXX')`,
	},
]

export default DeactivatePlan
