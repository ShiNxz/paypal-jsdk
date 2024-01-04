import type { Example } from '@/@types'
import type { CapturePayment as CapturePaymentType } from '@/@types/subscriptions'
import { CapturePaymentBody } from '@/schemas/Subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Captures an authorized payment from the subscriber on the subscription.
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
const CapturePayment = async (subId: string, options: CapturePaymentType): Promise<void> => {
	try {
		const body = CapturePaymentBody.parse(options)

		await Paypal.post(`/billing/subscriptions/${subId}/capture`, body)
	} catch (error) {
		throw error
	}
}

export const description = 'Captures an authorized payment from the subscriber on the subscription.'

export const examples: Example[] = [
	{
		description: 'Captures an authorized payment',
		code: `await CapturePayment('I-K8P5B0NSA6N6', {
			amount: {
				currency_code: 'USD',
				value: '10.00',
			},
			capture_type: 'OUTSTANDING_BALANCE',
			notes: 'Payment for outstanding balance.',
		})`,
	},
]

export default CapturePayment
