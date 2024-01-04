import type { Tracker } from '@/@types/tracking'
import type { Example } from '@/@types'
import { trackersSchema } from '@/schemas/Tracking'
import Paypal from '@/utils/Axios'

/**
 * Add tracking information for multiple PayPal transactions
 *
 * Adds tracking information, with or without tracking numbers, for multiple PayPal transactions.
 * Accepts up to 20 tracking IDs.
 * For more information, see [Add tracking information with tracking numbers](https://developer.paypal.com/docs/tracking/integrate/#add-tracking-information-with-tracking-numbers) and [Add tracking information without tracking numbers](https://developer.paypal.com/docs/tracking/integrate/#add-tracking-information-without-tracking-numbers).
 * @param trackers An array of tracking information for shipments.
 */
const AddTracking = async (trackers: Tracker[]): Promise<void> => {
	try {
		const body = trackersSchema.parse(trackers)

		await Paypal.post(`/shipping/trackers-batch`, body)
	} catch (error) {
		throw error
	}
}

export const description = 'Add tracking information for multiple PayPal transactions'

export const examples: Example[] = [
	{
		description: 'Add tracking information for a single PayPal transactions',
		code: `const example: Tracker = {
			transaction_id: 'XXX',
			notify_buyer: true,
			shipment_direction: 'FORWARD',
			status: 'SHIPPED',
		}
		
		await AddTracking([example])`,
	},
]

export default AddTracking
