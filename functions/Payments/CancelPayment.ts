import { PaypalV2 } from '@/utils/Axios'

/**
 * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.
 * @param {String} authorizationId The ID of the authorized payment for which to void.
 *
 * @example
 * ```typescript
 * await Payments.cancel('XXX')
 * ```
 */
const CancelPayment = async (authorizationId: string): Promise<void> => {
	try {
		await PaypalV2.post(`/payments/authorizations/${authorizationId}/void`)
	} catch (error) {
		throw error
	}
}

export default CancelPayment
