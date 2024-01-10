import Paypal from '@/utils/Axios'

/**
 * Deletes a webhook, by ID.
 * @param webhook_id The ID of the webhook to delete.
 *
 * @example
 * ```typescript
 * await Webhooks.delete('XXX')
 * ```
 */
const DeleteWebhook = async (webhook_id: string): Promise<void> => {
	try {
		await Paypal.delete(`/notifications/webhooks/${webhook_id}`)
	} catch (error) {
		throw error
	}
}

export default DeleteWebhook
