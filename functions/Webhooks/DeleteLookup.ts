import Paypal from '@/utils/Axios'

/**
 * Deletes a webhook lookup, by ID.
 * @param webhook_lookup_id The ID of the webhook lookup to delete.
 *
 * @example
 * ```typescript
 * await DeleteLookup('XXX')
 * ```
 */
const DeleteLookup = async (webhook_lookup_id: string): Promise<void> => {
	try {
		await Paypal.delete(`/notifications/webhooks-lookup/${webhook_lookup_id}`)
	} catch (error) {
		throw error
	}
}

export default DeleteLookup
