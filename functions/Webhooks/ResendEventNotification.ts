import type { EventTypesResponse } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Resends a webhook event notification, by ID.
 * Any pending notifications are not resent.
 * @param event_id The ID of the webhook event notification to resend.
 * @param webhook_ids An array of webhook account IDs.
 *
 * @example
 * ```typescript
 * const eventNotifications = await Webhooks.resendEventNotification('WH-XXX', ['8PT59735JN779430N'])
 * ```
 */
const ResendEventNotification = async (
	event_id: string,
	webhook_ids: string[]
): Promise<EventTypesResponse['event_types']> => {
	try {
		const { data } = await Paypal.post<EventTypesResponse>(`/notifications/webhooks-events/${event_id}/resend`, {
			webhook_ids,
		})

		return (data && data.event_types) || []
	} catch (error) {
		throw error
	}
}

export default ResendEventNotification
