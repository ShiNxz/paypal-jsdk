import Paypal from '@/utils/Axios'

/**
 * Deactivates a plan, by ID.
 * @param planId The ID of the plan to deactivate.
 *
 * @example
 * ```typescript
 * await Plans.deactivate('P-XXX')
 * ```
 */
const DeactivatePlan = async (planId: string): Promise<void> => {
	try {
		return await Paypal.post(`/billing/plans/${planId}/deactivate`)
	} catch (error) {
		throw error
	}
}

export default DeactivatePlan
