import type { EventNotification } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a webhooks event notification, by ID.
 * @param event_id The ID of the webhook event notification for which to show details.
 * 
 * @example
 * ```typescript
 * const eventNotifications = await Webooks.showEventNotificationDetails('WH-XXX')
 * ```
 */
const ShowEventNotificationDetails = async (event_id: string): Promise<EventNotification> => {
	try {
		const { data } = await Paypal.get<EventNotification>(`/notifications/webhooks-events/${event_id}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowEventNotificationDetails
