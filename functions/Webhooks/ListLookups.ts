import type { WebhookLookup } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Lists all webhook lookups.
 *
 * @example
 * ```typescript
 * const lookups = await Webhooks.listLookups()
 * ```
 */
const ListWebhookLookups = async (): Promise<WebhookLookup[]> => {
	try {
		const { data } = await Paypal.get<{ webhooks_lookups: WebhookLookup[] }>(`/notifications/webhooks-lookup`)

		return (data && data.webhooks_lookups) || []
	} catch (error) {
		throw error
	}
}

export default ListWebhookLookups
