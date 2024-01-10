import type { WebhookLookup } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Creates a webhook lookup.
 *
 * @example
 * ```typescript
 * const lookup = await Webhooks.createLookup()
 * ```
 */
const CreateWebhookLookup = async (): Promise<WebhookLookup> => {
	try {
		const { data } = await Paypal.post<WebhookLookup>(`/notifications/webhooks-lookup`)

		return data
	} catch (error) {
		throw error
	}
}

export default CreateWebhookLookup
