import type { RefundPayment } from '@/@types/payments'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Shows details for a refund, by ID.
 * @param {String} refundId The PayPal-generated ID for the refund for which to show details.
 *
 * @example
 * ```typescript
 * const refundDetails = await Payments.refundDetails('XXX')
 * ```
 */
const ShowRefundDetails = async (refundId: string): Promise<RefundPayment> => {
	try {
		const { data } = await PaypalV2.get<RefundPayment>(`/payments/refunds/${refundId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowRefundDetails
