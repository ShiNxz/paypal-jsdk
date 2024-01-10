import Paypal from '@/utils/Axios'

/**
 * Activates a plan, by ID.
 * @param planId The ID of the plan to activate.
 *
 * @example
 * ```typescript
 * await Plans.activate('P-XXX')
 * ```
 */
const ActivatePlan = async (planId: string): Promise<void> => {
	try {
		return await Paypal.post(`/billing/plans/${planId}/activate`)
	} catch (error) {
		throw error
	}
}

export default ActivatePlan
