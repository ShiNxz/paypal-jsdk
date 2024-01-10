import type { EventNotification, SimulateWebhokEventBody } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Simulates a webhook event. In the JSON request body, specify a sample payload.
 * You need to subscribe to the following webhook events for Pay upon Invoice:
 * - `PAYMENT.CAPTURE.COMPLETED` A payment capture completes.
 * - `PAYMENT.CAPTURE.DENIED` A payment capture is denied.
 * - `CHECKOUT.PAYMENT-APPROVAL.REVERSED` PayPal reverses a payment capture.
 *
 * @example
 * ```typescript
 * const eventNotifications = await Webhooks.simulateEvent({
 * 	event_type: "PAYMENT.CAPTURE.COMPLETED",
 * })
 */
const SimulateWebhookEvent = async (body: SimulateWebhokEventBody): Promise<EventNotification> => {
	try {
		const { data } = await Paypal.post<EventNotification>(`/notifications/simulate-event`, body)

		return data && data
	} catch (error) {
		throw error
	}
}

export default SimulateWebhookEvent
