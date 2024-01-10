import type { EventNotificationsQuery, EventNotificationsResponse } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Lists webhooks event notifications.
 * Use query parameters to filter the response.
 * @param query Query parameters to append to the URL.
 *
 * @example
 * ```typescript
 * const eventNotifications = await Webhooks.listEventNotifications()
 * ```
 */
const ListEventNotifications = async (query?: EventNotificationsQuery): Promise<EventNotificationsResponse> => {
	try {
		const { data } = await Paypal.get<EventNotificationsResponse>(`/notifications/webhooks-event-types`, {
			params: query,
		})

		return data
	} catch (error) {
		throw error
	}
}

export default ListEventNotifications
