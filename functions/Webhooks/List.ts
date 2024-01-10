import type { CreatedWebhook } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Lists webhooks for an app.
 *
 * @example
 * ```typescript
 * const webhooks = await Webhooks.list()
 * ```
 */
const ListWebhooks = async (): Promise<CreatedWebhook[]> => {
	try {
		const { data } = await Paypal.get<{ webhooks: CreatedWebhook[] }>(`/notifications/webhooks`)

		return (data && data.webhooks) || []
	} catch (error) {
		throw error
	}
}

export default ListWebhooks
