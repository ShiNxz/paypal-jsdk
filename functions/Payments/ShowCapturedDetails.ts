import type { AuthorizedPayment } from '@/@types/payments'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Shows details for a captured payment, by ID.
 * @param {String} captureId The PayPal-generated ID for the captured payment for which to show details.
 *
 * @example
 * ```typescript
 * const authorizedPayment = await Payments.capturedDetails('XXX')
 * ```
 */
const ShowCapturedPaymentDetails = async (captureId: string): Promise<AuthorizedPayment> => {
	try {
		const { data } = await PaypalV2.get<AuthorizedPayment>(`/payments/captures/${captureId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowCapturedPaymentDetails
