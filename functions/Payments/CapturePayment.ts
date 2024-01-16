import type { AuthorizedPayment, CapturePaymentBody } from '@/@types/payments'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Captures an authorized payment, by ID.
 * @param {String} authorizationId The ID of the authorized payment for which to capture.
 * @param {CapturePaymentBody} body The amount to capture for an authorized payment.
 *
 * @example
 * ```typescript
 * const authorizedPayment = await Payments.capture('XXX', {
 * 	amount: {
 * 		currency_code: 'USD',
 * 		value: '100.00'
 * 	},
 * 	final_capture: true
 * })
 * ```
 */
const CapturePayment = async (authorizationId: string, body: CapturePaymentBody): Promise<AuthorizedPayment> => {
	try {
		const { data } = await PaypalV2.post<AuthorizedPayment>(
			`/payments/authorizations/${authorizationId}/capture`,
			body
		)

		return data
	} catch (error) {
		throw error
	}
}

export default CapturePayment
