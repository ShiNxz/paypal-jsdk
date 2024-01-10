import type { Order, CreatedOrder } from '@/@types/orders'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Creates an order. Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs.
 * For more information about processing payments, see [checkout](https://developer.paypal.com/docs/checkout/advanced/processing/) or [multiparty checkout](https://developer.paypal.com/docs/multiparty/checkout/advanced/processing/).
 *
 * @example
 * ```typescript
 * const order = await Orders.create({
 * 	intent: 'CAPTURE',
 * 	purchase_units: [
 * 		{
 * 			amount: {
 * 				currency_code: 'USD',
 * 				value: '10.00',
 * 				breakdown: {
 * 					item_total: {
 * 						currency_code: 'USD',
 * 						value: '10.00',
 * 					},
 * 				},
 * 			},
 * 			items: [
 * 				{
 * 					name: 'Test Item',
 * 					quantity: '1',
 * 					unit_amount: {
 * 						currency_code: 'USD',
 * 						value: '10.00',
 * 					},
 * 					category: 'DIGITAL_GOODS',
 * 				},
 * 			],
 * 		},
 * 	],
 * })
 * ```
 */
const CreateOrder = async (body: Order): Promise<CreatedOrder> => {
	try {
		const { data } = await PaypalV2.post<CreatedOrder>(`/checkout/orders`, body)

		return data
	} catch (error) {
		throw error
	}
}

export default CreateOrder
