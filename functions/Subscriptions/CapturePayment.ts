import type { CapturePaymentType } from '@/@types/subscriptions'
import { CapturePaymentBody } from '@/schemas/Subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Captures an authorized payment from the subscriber on the subscription.
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 *
 * @example
 * ```typescript
 * await Subscriptions.capture('I-XXX', {
 * 	note: 'Capturing payment...',
 * 	amount: {
 * 		currency_code: 'USD',
 * 		value: '10.00',
 * 	},
 * 	capture_type: 'OUTSTANDING_BALANCE',
 * })
 * ```
 **/
const CaptureSubPayment = async (subId: string, options: CapturePaymentType): Promise<void> => {
	try {
		const body = CapturePaymentBody.parse(options)

		await Paypal.post(`/billing/subscriptions/${subId}/capture`, body)
	} catch (error) {
		throw error
	}
}

export default CaptureSubPayment
