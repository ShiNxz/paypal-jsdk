import type { CreatedOrder, ConfirmOrder } from '@/@types/orders'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Payer confirms their intent to pay for the the Order with the given payment source.
 * @param orderId The ID of the order to confirm.
 * @param body The request body.
 * 
 * @example
 * ```typescript
 * const order = await Orders.confirm('XXX', {
 * 	payment_source: {
 * 		paypal: {
 * 			email_address: 'XXX',
 * 		},
 * 	},
 * })
 * ```
 */
const ConfirmOrder = async (orderId: string, body: ConfirmOrder): Promise<CreatedOrder> => {
	try {
		const { data } = await PaypalV2.post<CreatedOrder>(`/checkout/orders/${orderId}/confirm-payment-source`, body)

		return data
	} catch (error) {
		throw error
	}
}

export default ConfirmOrder
