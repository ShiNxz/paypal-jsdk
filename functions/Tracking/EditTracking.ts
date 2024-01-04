import type { Tracker } from '@/@types/tracking'
import type { Example } from '@/@types'
import { trackerSchema } from '@/schemas/Tracking'
import Paypal from '@/utils/Axios'

/**
 * Update or cancel tracking information for PayPal transaction
 *
 * Updates or cancels the tracking information for a PayPal transaction, by ID.
 * To cancel tracking information, call this method and set the status to CANCELLED.
 * For more information, see [Update or cancel tracking information](https://developer.paypal.com/docs/tracking/integrate/#update-or-cancel-tracking-information).
 * @param trackerId The ID of the tracker in the `transaction_id-tracking_number` format.
 * @param trackers An array of tracking information for shipments.
 */
const EditTracking = async (trackerId: string, options: Tracker[]): Promise<void> => {
	try {
		const body = trackerSchema.parse(options)

		await Paypal.put(`/shipping/trackers/${trackerId}`, body)
	} catch (error) {
		throw error
	}
}

export const description = 'Update or cancel tracking information for PayPal transaction'

export const examples: Example[] = [
	{
		description: 'Update or cancel tracking information for PayPal transaction',
		code: `const options = {
			transaction_id: 'XXX',
			notify_buyer: true,
			shipment_direction: 'FORWARD',
			status: 'SHIPPED',
		}
		
		await EditTracking('tracker_id', options)`,
	},
]

export default EditTracking
