import type { AuthorizedPayment } from '@/@types/payments'
import type { AmountPrice } from '@/@types'
import { PaypalV2 } from '@/utils/Axios'

/**
 * Reauthorize authorized payment
 * @param {String} authorizationId The ID of the authorized payment for which to reauthorize.
 * @param {CapturePaymentBody} amount The amount to reauthorize for an authorized payment.
 *
 * Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still available, reauthorize a payment after its initial three-day honor period expires. Within the 29-day authorization period, you can issue multiple re-authorizations after the honor period expires.
 * If 30 days have transpired since the date of the original authorization, you must create an authorized payment instead of reauthorizing the original authorized payment.
 * A reauthorized payment itself has a new honor period of three days.
 * You can reauthorize an authorized payment from 4 to 29 days after the 3-day honor period. The allowed amount depends on context and geography, for example in US it is up to 115% of the original authorized amount, not to exceed an increase of $75 USD.
 * Supports only the `amount` request parameter.
 * `Note: This request is currently not supported for Partner use cases.`
 *
 * @example
 * ```typescript
 * const authorizedPayment = await Payments.reauthorize('XXX', {
 * 		currency_code: 'USD',
 * 		value: '100.00'
 * })
 * ```
 */
const ReauthorizePayment = async (authorizationId: string, amount: AmountPrice): Promise<AuthorizedPayment> => {
	try {
		const { data } = await PaypalV2.post<AuthorizedPayment>(
			`/payments/authorizations/${authorizationId}/reauthorize`,
			{
				amount,
			}
		)

		return data
	} catch (error) {
		throw error
	}
}

export default ReauthorizePayment
