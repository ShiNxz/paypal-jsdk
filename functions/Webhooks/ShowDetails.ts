import type { CreatedWebhook } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a webhook, by ID.
 * @param webhook_id The ID of the webhook for which to show details.
 *
 * @example
 * ```typescript
 * const webhook = await Webhooks.showDetails('8PT59735JN779430N')
 * ```
 */
const ShowWebhookDetails = async (webhook_id: string): Promise<CreatedWebhook> => {
	try {
		const { data } = await Paypal.get<CreatedWebhook>(`/notifications/webhooks/${webhook_id}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowWebhookDetails
