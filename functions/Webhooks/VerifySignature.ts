import type { VerifySignatureBody, VerifySignatureResponse } from '@/@types/webhooks'
import Paypal from '@/utils/Axios'

/**
 * Verifies a webhook signature.
 * @param body The request body parameters.
 *
 * @example
 * ```typescript
 * await Webhooks.verifySignature({
 * 	auth_algo: req.headers['paypal-auth-algo'],
 * 	cert_url: req.headers['paypal-cert-url'],
 * 	transmission_id: req.headers['paypal-transmission-id'],
 * 	transmission_sig: req.headers['paypal-transmission-sig'],
 * 	transmission_time: req.headers['paypal-transmission-time'],
 * 	webhook_id: '8PT59735JN779430N',
 * 	webhook_event: req.body
 * })
 * ```
 */
const VerifyWebhookSignature = async (body: VerifySignatureBody): Promise<VerifySignatureResponse> => {
	try {
		const { data } = await Paypal.post<VerifySignatureResponse>(`/notifications/verify-webhook-signature`, body)

		return data
	} catch (error) {
		throw error
	}
}

export default VerifyWebhookSignature
