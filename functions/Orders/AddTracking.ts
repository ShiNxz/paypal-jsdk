import type { CreatedOrder, AddOrderTrackingOptions } from '@/@types/orders'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Adds tracking information for an Order.
 *
 * @example
```typescript
 * const order = await Orders.addTracking('XXX', {
 * 	capture_id: 'XXX',
 * 	tracking_number: 'XXX',
 *	carrier: 'FEDEX',
 * })
 * ```
 */
const AddOrderTracking = async (orderId: string, options: AddOrderTrackingOptions): Promise<CreatedOrder> => {
	try {
		const { data } = await PaypalV2.post<CreatedOrder>(`/checkout/orders/${orderId}/track`, options)

		return data
	} catch (error) {
		throw error
	}
}

export default AddOrderTracking
