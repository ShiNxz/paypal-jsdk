import type { AmountPrice, Link } from '.'

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
 * - CREATED:	The authorized payment is created. No captured payments have been made for this authorized payment.
 * - CAPTURED:	The authorized payment has one or more captures against it. The sum of these captured payments is greater than the amount of the original authorized payment.
 * - DENIED:	PayPal cannot authorize funds for this authorized payment.
 * - PARTIALLY_CAPTURED:	A captured payment was made for the authorized payment for an amount that is less than the amount of the original authorized payment.
 * - VOIDED:	The authorized payment was voided. No more captured payments can be made against this authorized payment.
 * - PENDING:	The created authorization is in a pending state.
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
