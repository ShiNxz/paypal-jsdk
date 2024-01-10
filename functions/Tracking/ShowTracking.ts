import type { Tracker } from '@/@types/tracking'
import Paypal from '@/utils/Axios'

/**
 * Shows tracking information, by tracker ID, for a PayPal transaction.
 *
 * @param trackerId The ID of the tracker in the `transaction_id-tracking_number` format.
 *
 * @example
 * ```typescript
 * const information = await Tracking.information('XXX')
 * ```
 */
const ShowTrackingInformation = async (trackerId: string): Promise<Tracker> => {
	try {
		const { data } = await Paypal.get<Tracker>(`/shipping/get/${trackerId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowTrackingInformation
