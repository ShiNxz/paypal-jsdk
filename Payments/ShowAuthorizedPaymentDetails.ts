import type { Example } from '../types/General'
import type { AuthorizedPayment } from '../types/Payments'
import Paypal, { PaypalV2 } from '../utils/Axios'

/**
 * Shows details for an authorized payment, by ID.
 * @param {String} authorizationId The ID of the authorized payment for which to show details.
 */
const ShowAuthorizedPaymentDetails = async (authorizationId: string): Promise<AuthorizedPayment> => {
	try {
		const { data } = await PaypalV2.get<AuthorizedPayment>(`/payments/authorizations/${authorizationId}`)

		return data
	} catch (error) {
		throw error
	}
}

export const description = ''

export const examples: Example[] = [
	{
		description: '',
		code: `ShowAuthorizedPaymentDetails()`,
	},
]

export default ShowAuthorizedPaymentDetails
