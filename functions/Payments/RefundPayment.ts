import type { RefundPayment, RefundBody } from '@/@types/payments'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Refunds a captured payment, by ID.
 * For a full refund, include an empty payload in the JSON request body.
 * For a partial refund, include an `amount` object in the JSON request body.
 * @param {String} captureId The PayPal-generated ID for the captured payment to refund.
 *
 * @example
 * ```typescript
 * const refundDetails = await Payments.refundCaptured('XXX')
 * ```
 */
const RefundCapturedPayment = async (captureId: string, body: RefundBody): Promise<RefundPayment> => {
	try {
		const { data } = await PaypalV2.post<RefundPayment>(`/payments/captures/${captureId}/refund`, body)

		return data
	} catch (error) {
		throw error
	}
}

export default RefundCapturedPayment
