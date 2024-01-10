import type { EventTypesResponse } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Lists available events to which any webhook can subscribe.
 * For a list of supported events, see [Webhook event names](https://developer.paypal.com/docs/api/notifications/webhooks/event-names/).
 *
 * @example
 * ```typescript
 * const events = await Webhooks.listAvailableEvents()
 * ```
 */
const ListAvailableEvents = async (): Promise<EventTypesResponse['event_types']> => {
	try {
		const { data } = await Paypal.get<EventTypesResponse>(`/notifications/webhooks-event-types`)

		return (data && data.event_types) || []
	} catch (error) {
		throw error
	}
}

export default ListAvailableEvents
