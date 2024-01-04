import type { Tracker } from '@/@types/tracking'
import { Example } from '@/@types'
import Paypal from '@/utils/Axios'

/**
 * Shows tracking information, by tracker ID, for a PayPal transaction.
 *
 * @param trackerId The ID of the tracker in the `transaction_id-tracking_number` format.
 */
const ShowTrackingInformation = async (trackerId: string): Promise<Tracker> => {
	try {
		const { data } = await Paypal.get<Tracker>(`/shipping/get/${trackerId}`)

		return data
	} catch (error) {
		throw error
	}
}

export const description = 'Shows tracking information, by tracker ID, for a PayPal transaction.'

export const examples: Example[] = [
	{
		description: 'Shows tracking information for a transaction.',
		code: `await EditTracking('tracker_id', options)`,
	},
]

export default ShowTrackingInformation
