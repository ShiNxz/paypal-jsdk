import type { CreatedWebhook, PaypalEventType } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Subscribes your webhook listener to events.
 * @param url The URL that is configured to listen on localhost for incoming POST notification messages that contain event information.
 * @param event_types An array of events to which to subscribe your webhook. To subscribe to all events, including events as they are added, specify the asterisk wild card. To replace the event_types array, specify the asterisk wild card. To list all supported events, [list available events](https://developer.paypal.com/docs/api/webhooks/v1/#event-type_list).
 *
 * @example
 * ```typescript
 * const webhook = await Webhooks.create('https://example.com', ['BILLING.SUBSCRIPTION.CREATED'])
 * ```
 */
const CreateWebhook = async (url: string, events: PaypalEventType[]): Promise<CreatedWebhook> => {
	try {
		const event_types = events.map((event) => ({ name: event }))

		const { data } = await Paypal.post<CreatedWebhook>(`/notifications/webhooks`, {
			url,
			event_types,
		})

		return data
	} catch (error) {
		throw error
	}
}

export default CreateWebhook
