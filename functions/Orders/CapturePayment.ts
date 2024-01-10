import type { CreatedOrder, AuthorizeOrder } from '@/@types/orders'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Captures payment for an order.
 * To successfully capture payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request.
 * A buyer can approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS links in the create order response.
 *
 * @example
 * ```typescript
 * const order = await Orders.capturePayment('XXX')
 * ```
 */
const CaptureOrderPayment = async (orderId: string, options?: AuthorizeOrder): Promise<CreatedOrder> => {
	try {
		const { data } = await PaypalV2.post<CreatedOrder>(`/checkout/orders/${orderId}/capture`, options)

		return data
	} catch (error) {
		throw error
	}
}

export default CaptureOrderPayment
