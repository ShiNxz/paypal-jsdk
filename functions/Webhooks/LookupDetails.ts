import type { WebhookLookup } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a webhook lookup, by ID.
 * @param webhook_lookup_id The ID of the webhook lookup to retrieve.
 *
 * @example
 * ```typescript
 * const lookup = await Webhooks.lookupDetails('8PT59735JN779430N')
 * ```
 */
const WebhookLookupDetails = async (webhook_lookup_id: string): Promise<WebhookLookup> => {
	try {
		const { data } = await Paypal.get<WebhookLookup>(`/notifications/webhooks-lookup/${webhook_lookup_id}`)

		return data
	} catch (error) {
		throw error
	}
}

export default WebhookLookupDetails
