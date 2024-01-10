import type { AuthorizedPayment } from '@/@types/payments'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Shows details for an authorized payment, by ID.
 * @param {String} authorizationId The ID of the authorized payment for which to show details.
 *
 * @example
 * ```typescript
 * const authorizedPayment = await Payments.showAuthorizedDetails('XXX')
 * ```
 */
const ShowAuthorizedPaymentDetails = async (authorizationId: string): Promise<AuthorizedPayment> => {
	try {
		const { data } = await PaypalV2.get<AuthorizedPayment>(`/payments/authorizations/${authorizationId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowAuthorizedPaymentDetails
