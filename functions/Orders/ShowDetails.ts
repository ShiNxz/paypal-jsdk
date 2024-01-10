import type { CreatedOrder } from '@/@types/orders'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Shows details for an order, by ID.
 * @param orderId The ID of the order to show details for.
 *
 * @example
 * ```typescript
 * const order = await Orders.showDetails('XXX')
 * ```
 */
const ShowOrderDetails = async (orderId: string): Promise<CreatedOrder> => {
	try {
		const { data } = await PaypalV2.get<CreatedOrder>(`/checkout/orders/${orderId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowOrderDetails
