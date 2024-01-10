import type { CreatedWebhook } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Lists event subscriptions for a webhook, by ID.
 * @param webhook_id The ID of the webhook for which to list events.
 * 
 * @example
 * ```typescript
 * const events = await Webhooks.listEvents('8PT59735JN779430N')
 * ```
 */
const ListWebhookEvents = async (webhook_id: string): Promise<CreatedWebhook['event_types']> => {
	try {
		const { data } = await Paypal.get<CreatedWebhook['event_types']>(
			`/notifications/webhooks/${webhook_id}/event-types`
		)

		return data
	} catch (error) {
		throw error
	}
}

export default ListWebhookEvents
