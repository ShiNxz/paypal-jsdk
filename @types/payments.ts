import type { AmountPrice, Link } from '.'
import type { DisbursementMode, PaymentInstruction } from './orders'

export interface AuthorizedPayment {
	/**
	 * The status of the authorized payment.
	 */
	status?: AuthorizationStatus
	/**
	 * The details of the authorized order pending status.
	 */
	status_details?: StatusDetails
	/**
	 * The PayPal-generated ID for the authorized payment.
	 */
	id?: string
	/**
	 * The API caller-provided external invoice number for this order.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 */
	invoiceId?: string
	/**
	 * The API caller-provided external ID.
	 * Used to reconcile API caller-initiated transactions with PayPal transactions.
	 * Appears in transaction and settlement reports.
	 * The pattern is defined by an external party and supports Unicode.
	 */
	customId?: string
	/**
	 * An array of related HATEOAS links.
	 */
	links?: Link[]
	/**
	 * The amount for this authorized payment.
	 */
	amount?: AmountPrice
	/**
	 * Reference values used by the card network to identify a transaction.
	 */
	network_transaction_reference?: NetworkTransactionReference
	/**
	 * The level of protection offered as defined by PayPal Seller Protection for Merchants.
	 * @see https://www.paypal.com/us/webapps/mpp/security/seller-protection?_ga=2.65763566.1795084420.1703891260-1944583344.1698732461
	 */
	seller_protection?: SellerProtection

	/**
	 * The date and time when the authorized payment expires, in Internet date and time format.
	 * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
	 */
	expiration_time?: string

	/**
	 * The date and time when the transaction occurred, in Internet date and time format.
	 * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
	 */
	create_time?: string

	/**
	 * The date and time when the transaction was last updated, in Internet date and time format.
	 * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
	 */
	update_time?: string

	/**
	 * An object that provides supplementary/additional data related to a payment transaction.
	 */
	supplementary_data?: SupplementaryData

	/**
	 * The details associated with the merchant for this transaction.
	 */
	payee?: Payee
}

/**
 * Reference values used by the card network to identify a transaction.
 */
interface NetworkTransactionReference {
	/**
	 * @required
	 * Transaction reference id returned by the scheme. For Visa and Amex, this is the "Tran id" field in response.
	 * For MasterCard, this is the "BankNet reference id" field in response.
	 * For Discover, this is the "NRID" field in response. The pattern we expect for this field from Visa/Amex/CB/Discover is numeric,
	 * Mastercard/BNPP is alphanumeric and Paysecure is alphanumeric with special character -.
	 */
	id: string

	/**
	 * The date that the transaction was authorized by the scheme.
	 * This field may not be returned for all networks.
	 * MasterCard refers to this field as "BankNet reference date.
	 */
	date?: string

	/**
	 * Reference ID issued for the card transaction. This ID can be used to track the transaction across processors, card brands and issuing banks.
	 */
	acquirer_reference_number?: string

	/**
	 * Name of the card network through which the transaction was routed.
	 */
	network?: CardNetwork
}

export interface Payee {
	/**
	 * The email address of merchant.
	 */
	email_address?: string
	/**
	 * The encrypted PayPal account ID of the merchant.
	 */
	merchant_id?: string
}

export interface SupplementaryData {
	related_ids?: RelatedIds
}

export interface RelatedIds {
	/**
	 * Order ID related to the resource.
	 */
	order_id?: string

	/**
	 * Authorization ID related to the resource.
	 */
	authorization_id?: string

	/**
	 * Capture ID related to the resource.
	 */
	capture_id?: string
}

/**
 * @required
 * - ELIGIBLE: Your PayPal balance remains intact if the customer claims that they did not receive an item or the account holder claims that they did not authorize the payment.
 * - PARTIALLY_ELIGIBLE: Your PayPal balance remains intact if the customer claims that they did not receive an item.
 * - NOT_ELIGIBLE: This transaction is not eligible for seller protection.
 */
export type SellerProtectionStatus = 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE'

interface SellerProtection {
	/**
	 * Indicates whether the transaction is eligible for seller protection.
	 */
	status?: SellerProtectionStatus

	/**
	 * An array of conditions that are covered for the transaction.
	 */
	dispute_categories?: string[]
}

/**
 * The status for the authorized payment.
 * @required
 * - `CREATED`: The authorized payment is created. No captured payments have been made for this authorized payment.
 * - `CAPTURED`: The authorized payment has one or more captures against it. The sum of these captured payments is greater than the amount of the original authorized payment.
 * - `DENIED`: PayPal cannot authorize funds for this authorized payment.
 * - `PARTIALLY_CAPTURED`: A captured payment was made for the authorized payment for an amount that is less than the amount of the original authorized payment.
 * - `VOIDED`: The authorized payment was voided. No more captured payments can be made against this authorized payment.
 * - `PENDING`: The created authorization is in a pending state.
 */
export type AuthorizationStatus = 'CREATED' | 'CAPTURED' | 'DENIED' | 'PARTIALLY_CAPTURED' | 'VOIDED' | 'PENDING'

/**
 * @required
 * Represents the Card Network type.
 */
export type CardNetwork =
	| 'VISA'
	| 'MASTER'
	| 'DISCOVER'
	| 'AMEX'
	| 'SOLO'
	| 'JCB'
	| 'STAR'
	| 'DELTA'
	| 'SWITCH'
	| 'MAESTRO'
	| 'CB_NATIONALE'
	| 'CONFIGOGA'
	| 'CONFIDIS'
	| 'ELECTRON'
	| 'CETELEM'
	| 'CHINA_UNION_PAY'

export interface StatusDetails {
	/**
	 * The reason why the authorized status is PENDING.
	 * Values can be:
	 * - PENDING_REVIEW: Authorization is pending manual review.
	 */
	reason?: 'PENDING_REVIEW'
}

export interface CapturePaymentBody {
	/**
	 * The API caller-provided external invoice number for this order.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	invoice_id?: string

	/**
	 * An informational note about this settlement.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	note_to_payer?: string

	/**
	 * Indicates whether you can make additional captures against the authorized payment.
	 * Set to true if you do not intend to capture additional payments against the authorization.
	 * Set to false if you intend to capture additional payments against the authorization.
	 * @optional
	 * @default false
	 */
	final_capture?: boolean

	/**
	 * Any additional payment instructions to be consider during payment processing.
	 * This processing instruction is applicable for Capturing an order or Authorizing an Order.
	 * @optional
	 */
	disbursement_mode?: DisbursementMode
	/**
	 * The payment descriptor on the payer's account statement.
	 */
	soft_descriptor?: string

	/**
	 * The amount to capture.
	 * To capture a portion of the full authorized amount, specify an amount.
	 * If amount is not specified, the full authorized amount is captured.
	 * The amount must be a positive number and in the same currency as the authorization against which the payment is being captured.
	 * @optional
	 */
	amount?: AmountPrice
}

export interface RefundBody {
	/**
	 * The API caller-provided external ID.
	 * Used to reconcile API caller-initiated transactions with PayPal transactions.
	 * Appears in transaction and settlement reports.
	 * The pattern is defined by an external party and supports Unicode.
	 */
	customId?: string
	/**
	 * The API caller-provided external invoice number for this order.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	invoice_id?: string
	/**
	 * The reason for the refund.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * The pattern is defined by an external party and supports Unicode.
	 * @optional
	 */
	note_to_payer?: string
	/**
	 * The amount to refund.
	 * To refund a portion of the captured amount, specify an amount.
	 * If amount is not specified, an amount equal to `captured amount - previous refunds` is refunded.
	 * The amount must be a positive number and in the same currency as the one in which the payment was captured.
	 * @optional
	 */
	amount?: AmountPrice
	/**
	 * Any additional refund instructions to be set during refund payment processing.
	 * This object is only applicable to merchants that have been enabled for PayPal Commerce Platform for Marketplaces and Platforms capability.
	 * Please speak to your account manager if you want to use this capability.
	 * @optional
	 */
	payment_instruction?: PaymentInstruction
}

export interface RefundPayment {
	/**
	 * The status of the refund.
	 * @optional
	 */
	status?: RefundStatus

	/**
	 * The details of the refund status.
	 * @optional
	 */
	status_details?: {
		/**
		 * The reason why the refund has the `PENDING` or `FAILED` status.
		 * - `ECHECK`: The customer's account is funded through an eCheck, which has not yet cleared.
		 * @optional
		 */
		reason?: 'ECHECK'
	}
	/**
	 * The PayPal-generated ID for the refund.
	 * @optional
	 */
	id?: string

	/**
	 * The API caller-provided external invoice number for this order.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	invoice_id?: string

	/**
	 * The API caller-provided external ID.
	 * Used to reconcile API caller-initiated transactions with PayPal transactions.
	 * Appears in transaction and settlement reports.
	 * @optional
	 */
	custom_id?: string

	/**
	 * Reference ID issued for the card transaction.
	 * This ID can be used to track the transaction across processors, card brands and issuing banks.
	 * @optional
	 */
	acquirer_reference_number?: string

	/**
	 * The reason for the refund.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	note_to_payer?: string

	/**
	 * The breakdown of the refund.
	 * @optional
	 */
	seller_payable_breakdown?: SellerPayableBreakdown

	/**
	 * An array of related [HATEOAS links](https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links).
	 * @optional
	 */
	links?: Link[]

	/**
	 * The amount that the payee refunded to the payer.
	 * @optional
	 */
	amount?: AmountPrice

	/**
	 * The details associated with the merchant for this transaction.
	 * @optional
	 */
	payer?: Payee

	/**
	 * The date and time when the transaction occurred, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 * @optional
	 */
	create_time?: string

	/**
	 * The date and time when the transaction was last updated, [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 * @optional
	 */
	update_time?: string
}

export interface SellerPayableBreakdown {
	/**
	 * An array of platform or partner fees, commissions, or brokerage fees for the refund.
	 * @optional
	 */
	platform_fees?: AmountPrice

	/**
	 * An array of breakdown values for the net amount.
	 * Returned when the currency of the refund is different from the currency of the PayPal account where the payee holds their funds.
	 * @optional
	 */
	net_amount_breakdown: NetAmountBreakdown[]

	/**
	 * The amount that the payee refunded to the payer.
	 * @optional
	 */
	gross_amount?: AmountPrice

	/**
	 * The PayPal fee that was refunded to the payer in the currency of the transaction.
	 * This fee might not match the PayPal fee that the payee paid when the payment was captured.
	 * @optional
	 */
	paypal_fee?: AmountPrice

	/**
	 * The PayPal fee that was refunded to the payer in the receivable currency.
	 * Returned only in cases when the receivable currency is different from transaction currency.
	 * @example 'CNY'.
	 */
	paypal_fee_in_receivable_currency?: AmountPrice

	/**
	 * The total amount refunded from the original capture to date.
	 * For example, if a payer makes a $100 purchase and was refunded $20 a week ago and was refunded $30 in this refund, the `gross_amount` is $30 for this refund and the `total_refunded_amount` is $50.
	 * @optional
	 */
	total_refunded_amount?: AmountPrice
}

export interface NetAmountBreakdown {
	/**
	 * The net amount debited from the merchant's PayPal account.
	 * @optional
	 */
	payable_amount?: AmountPrice

	/**
	 * The converted payable amount.
	 * @optional
	 */
	converted_amount?: AmountPrice

	/**
	 * The exchange rate that determines the amount that was debited from the merchant's PayPal account.
	 * @optional
	 */
	exchange_rate: ExchangeRate
}

export interface ExchangeRate {
	/**
	 * The target currency amount.
	 * Equivalent to one unit of the source currency.
	 * Formatted as integer or decimal value with one to 15 digits to the right of the decimal point.
	 * @optional
	 */
	value?: string

	/**
	 * The source currency from which to convert an amount.
	 * @optional
	 */
	source_currency?: string

	/**
	 * The target currency to which to convert an amount.
	 * @optional
	 */
	target_currency?: string
}

/**
 * - `CANCELLED`: The refund was cancelled.
 * - `FAILED`: The refund could not be processed.
 * - `PENDING`: The refund is pending. For more information, see status_details.reason.
 * - `COMPLETED`: The funds for this transaction were debited to the customer's account.
 */
export type RefundStatus = 'CANCELLED' | 'FAILED' | 'PENDING' | 'COMPLETED'
