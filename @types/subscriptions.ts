import type { PaymentPreferences, PlanBillingCycle, PlanBody } from './plans'
import type { Address, AmountPrice } from '.'
import type { Link, Taxes } from '.'

export interface CreateSubscriptionBody {
	/**
	 * The quantity of the product in the subscription.
	 */
	quantity?: string
	/**
	 * Indicates whether the subscription auto-renews after the billing cycles complete.
	 * @default false
	 * @DEPRECATED
	 */
	auto_renewal?: boolean
	/**
	 * The custom id for the subscription. Can be invoice id.
	 */
	custom_id?: string
	/**
	 * The date and time when the subscription started, in Internet date and time format.
	 * @default "Current time"
	 */
	start_time?: string
	/**
	 * The shipping charges.
	 */
	shipping_amount?: AmountPrice
	/**
	 * The subscriber request information .
	 */
	subscriber?: {
		/**
		 * The email address of the payer.
		 */
		email_address?: string
		/**
		 * The name of the payer. Supports only the given_name and surname properties.
		 */
		name?: Name
	}
	/**
	 * The phone number of the customer.
	 * Available only when you enable the Contact Telephone Number option in the Profile & Settings for the merchant's PayPal account.
	 * The phone.phone_number supports only national_number.
	 * @see https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-website-payments&_ga=2.70891984.1795084420.1703891260-1944583344.1698732461
	 */
	phone?: {
		/**
		 * The phone type.
		 */
		phone_type?: 'FAX' | 'HOME' | 'MOBILE' | 'OTHER' | 'PAGER'
		/**
		 * The phone number, in its canonical international E.164 numbering plan format.
		 * Supports only the national_number property.
		 * @see https://www.itu.int/rec/T-REC-E.164/en
		 */
		phone_number: {
			/**
			 * The national number, in its canonical international E.164 numbering plan format.
			 * The combined length of the country calling code (CC) and the national number must not be greater than 15 digits.
			 * The national number consists of a national destination code (NDC) and subscriber number (SN).
			 * @see https://www.itu.int/rec/T-REC-E.164/en
			 */
			national_number: string
		}
	}
	/**
	 * The shipping details.
	 */
	shipping_address?: {
		/**
		 * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup.
		 * Either type or options but not both may be present.
		 * - SHIPPING - The payer intends to receive the items at a specified address.
		 * - PICKUP_IN_PERSON - The payer intends to pick up the items from the payee in person.
		 */
		type?: 'SHIPPING' | 'PICKUP_IN_PERSON'
		/**
		 * The name of the person to whom to ship the items. Supports only the full_name property.
		 */
		name?: Name
		/**
		 * The address of the person to whom to ship the items.
		 * Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
		 */
		address?: Address
		/**
		 * The payment source definition.
		 * To be eligible to create subscription using debit or credit card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
		 * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
		 * @see https://www.paypal.com/bizsignup/entry/product/ppcp?_ga=2.170497376.1795084420.1703891260-1944583344.1698732461
		 */
		payment_source?: {
			/**
			 * The payment card to use to fund a payment. Can be a credit or debit card.
			 */
			card?: Card
		}
	}
	/**
	 * The application context, which customizes the payer experience during the subscription approval process with PayPal.
	 */
	application_context?: ApplicationContext
	/**
	 * An inline plan object to customise the subscription. You can override plan level default attributes by providing customised values for the subscription in this object.
	 */
	plan?: {
		billing_cycles: PlanBillingCycle
		payment_preferences: PaymentPreferences
		taxes: Taxes
	}
}

interface ApplicationContext {
	/**
	 * The label that overrides the business name in the PayPal account on the PayPal site.
	 */
	brand_name?: string
	/**
	 * The location from which the shipping address is derived.
	 * - GET_FROM_FILE - Get the customer-provided shipping address on the PayPal site.
	 * - NO_SHIPPING - Redacts the shipping address from the PayPal site. Recommended for digital goods.
	 * - SET_PROVIDED_ADDRESS - Get the merchant-provided address. The customer cannot change this address on the PayPal site. If merchant does not pass an address, customer can choose the address on PayPal pages.
	 */
	shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS'
	/**
	 * Configures the label name to Continue or Subscribe Now for subscription consent experience.
	 * - CONTINUE - After you redirect the customer to the PayPal subscription consent page, a Continue button appears. Use this option when you want to control the activation of the subscription and do not want PayPal to activate the subscription.
	 * - SUBSCRIBE_NOW - After you redirect the customer to the PayPal subscription consent page, a Subscribe Now button appears. Use this option when you want PayPal to activate the subscription.
	 */
	user_action?: 'CONTINUE' | 'SUBSCRIBE_NOW'
	/**
	 * The URL where the customer is redirected after the customer approves the payment.
	 * @required
	 */
	return_url: string
	/**
	 * The URL where the customer is redirected after the customer cancels the payment.
	 * @required
	 */
	cancel_url: string
	/**
	 * The BCP 47-formatted locale of pages that the PayPal payment experience shows.
	 * PayPal supports a five-character code.
	 * @example, da-DK, he-IL, id-ID, ja-JP, no-NO, pt-BR, ru-RU, sv-SE, th-TH, zh-CN, zh-HK, or zh-TW.
	 */
	locale?: string
	/**
	 * The customer and merchant payment preferences.
	 * Currently only PAYPAL payment method is supported.
	 */
	payment_method?: {
		/**
		 * The customer-selected payment method on the merchant site.
		 */
		payer_selected?: string
		/**
		 * The merchant-preferred payment methods.
		 * - UNRESTRICTED - Accepts any type of payment from the customer.
		 * - IMMEDIATE_PAYMENT_REQUIRED - Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the pending status.
		 */
		payee_preferred?: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED'
	}
}

export interface ReviseSubscriptionBody {
	quantity?: string
	shipping_amount?: AmountPrice
	shipping_address?: {
		/**
		 * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup.
		 * Either type or options but not both may be present.
		 * - SHIPPING - The payer intends to receive the items at a specified address.
		 * - PICKUP_IN_PERSON - The payer intends to pick up the items from the payee in person.
		 */
		type?: 'SHIPPING' | 'PICKUP_IN_PERSON'
		/**
		 * The name of the person to whom to ship the items. Supports only the full_name property.
		 */
		name?: Name
		/**
		 * The address of the person to whom to ship the items.
		 * Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
		 */
		address?: Address
		/**
		 * The payment source definition.
		 * To be eligible to create subscription using debit or credit card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
		 * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
		 * @see https://www.paypal.com/bizsignup/entry/product/ppcp?_ga=2.170497376.1795084420.1703891260-1944583344.1698732461
		 */
	}
	application_context?: ApplicationContext
	plan?: {
		billing_cycles: PlanBillingCycle
		payment_preferences: PaymentPreferences
		taxes: Taxes
	}
}

interface Card {
	/**
	 * The card holder's name as it appears on the card.
	 */
	name?: string
	/**
	 * The primary account number (PAN) for the payment card.
	 * @required
	 */
	number: string
	/**
	 * The three- or four-digit security code of the card.
	 * Also known as the CVV, CVC, CVN, CVE, or CID.
	 * This parameter cannot be present in the request when payment_initiator=MERCHANT.
	 */
	security_code?: string
	/**
	 * The card expiration year and month, in Internet date format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	expiry: string
	/**
	 * The billing address for this card. Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
	 */
	billing_address?: Address
}

interface Name {
	/**
	 * When the party is a person, the party's given, or first, name.
	 */
	given_name?: string
	/**
	 * When the party is a person, the party's surname or family name.
	 * Also known as the last name.
	 * Required when the party is a person.
	 * Use also to store multiple surnames including the matronymic, or mother's, surname.
	 */
	surname?: string
}

/**
 * - APPROVAL_PENDING The subscription is created but not yet approved by the buyer.
 * - APPROVED The buyer has approved the subscription.
 * - ACTIVE The subscription is active.
 * - SUSPENDED The subscription is suspended.
 * - CANCELLED The subscription is cancelled.
 * - EXPIRED The subscription is expired.
 */
export type SubscriptionStatus = 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED'

export interface CreatedSubscription {
	/**
	 * The status of the subscription.
	 */
	status?: SubscriptionStatus
	/**
	 * The reason or notes for the status of the subscription.
	 */
	status_change_note?: string
	/**
	 * The date and time, in Internet date and time format. Seconds are required while fractional seconds are optional.
	 */
	status_update_time?: string
	/**
	 * The PayPal-generated ID for the subscription.
	 */
	id?: string
	/**
	 * The ID of the plan.
	 */
	plan_id?: string
	/**
	 * The quantity of the product in the subscription.
	 */
	quantity?: string
	/**
	 * The custom id for the subscription. Can be invoice id.
	 */
	custom_id?: string
	/**
	 * Indicates whether the subscription has overridden any plan attributes.
	 */
	plan_overridden?: boolean
	/**
	 * An array of request-related HATEOAS links.
	 * @see https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
	 */
	links?: Link[]
	/**
	 * The date and time, in Internet date and time format.
	 * Seconds are required while fractional seconds are optional.
	 * @note The regular expression provides guidance but does not reject all invalid dates.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	start_time?: string
	/**
	 * The currency and amount for a financial transaction, such as a balance or payment due.
	 */
	shipping_amount?: AmountPrice
	/**
	 * The subscriber response information.
	 */
	subscriber?: CreateSubscriptionBody['subscriber']
	/**
	 * The billing details for the subscription. If the subscription was or is active, these fields are populated.
	 */
	billing_info?: BillingInfo
	/**
	 * The date and time, in Internet date and time format.
	 * Seconds are required while fractional seconds are optional.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	create_time?: string
	/**
	 * The date and time, in Internet date and time format.
	 * Seconds are required while fractional seconds are optional.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	update_time?: string
	/**
	 * Inline plan details.
	 */
	plan?: PlanBody
	/**
	 * The payment & subscription link.
	 */
	paymentUrl: string | null
}

export interface BillingInfo {
	/**
	 * The trial and regular billing executions.
	 */
	cycle_executions?: CycleExecution[]
	/**
	 * The number of consecutive payment failures.
	 * Resets to 0 after a successful payment.
	 * If this reaches the payment_failure_threshold value, the subscription updates to the SUSPENDED state.
	 */
	failed_payments_count: number
	/**
	 * The total pending bill amount, to be paid by the subscriber.
	 */
	outstanding_balance: AmountPrice
	/**
	 * The details for the last payment of the subscription.
	 */
	last_payment?: Payment
	/**
	 * The next date and time for billing this subscription, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	next_billing_time?: string
	/**
	 * The date and time when the final billing cycle occurs, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	final_payment_time: string
	/**
	 * The details for the last failed payment of the subscription.
	 */
	last_failed_payment: FailedPayment
}

/**
 * - COMPLETED: The funds for this captured payment were credited to the payee's PayPal account.
 * - DECLINED: The funds could not be captured.
 * - PARTIALLY_REFUNDED: An amount less than this captured payment's amount was partially refunded to the payer
 * - PENDING: The funds for this captured payment was not yet credited to the payee's PayPal account. For more information, see status.details.
 * - REFUNDED: An amount greater than or equal to this captured payment's amount was refunded to the payer.
 */
export type PaymentStatus = 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED'

export interface Payment {
	/**
	 * The status of the captured payment.
	 */
	status?: PaymentStatus
	/**
	 * The last payment amount.
	 */
	amount: AmountPrice
	/**
	 * The date and time when the last payment was made, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	time: string
}

/**
 * - PAYMENT_DENIED PayPal declined the payment due to one or more customer issues.
 * - INTERNAL_SERVER_ERROR An internal server error has occurred.
 * - PAYEE_ACCOUNT_RESTRICTED The payee account is not in good standing and cannot receive payments.
 * - PAYER_ACCOUNT_RESTRICTED The payer account is not in good standing and cannot make payments.
 * - PAYER_CANNOT_PAY Payer cannot pay for this transaction.
 * - SENDING_LIMIT_EXCEEDED The transaction exceeds the payer's sending limit.
 * - TRANSACTION_RECEIVING_LIMIT_EXCEEDED The transaction exceeds the receiver's receiving limit.
 * - CURRENCY_MISMATCH The transaction is declined due to a currency mismatch.
 */
export type ReasonCode =
	| 'PAYMENT_DENIED'
	| 'INTERNAL_SERVER_ERROR'
	| 'PAYEE_ACCOUNT_RESTRICTED'
	| 'PAYER_ACCOUNT_RESTRICTED'
	| 'PAYER_CANNOT_PAY'
	| 'SENDING_LIMIT_EXCEEDED'
	| 'TRANSACTION_RECEIVING_LIMIT_EXCEEDED'
	| 'CURRENCY_MISMATCH'

export interface FailedPayment {
	/**
	 * The reason code for the payment failure.
	 */
	reason_code: ReasonCode
	/**
	 * The failed payment amount.
	 */
	amount: AmountPrice
	/**
	 * The date and time when the failed payment was made, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	time: string
	/**
	 * The time when the retry attempt for the failed payment occurs, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	next_payment_retry_time?: string
}

export interface CycleExecution {
	/**
	 * The type of the billing cycle.
	 */
	tenure_type: 'REGULAR' | 'TRIAL'
	/**
	 * The order in which to run this cycle among other billing cycles.
	 */
	sequence: number
	/**
	 * The number of billing cycles that have completed.
	 */
	cycles_completed: number
	/**
	 * For a finite billing cycle, cycles_remaining is the number of remaining cycles. For an infinite billing cycle, cycles_remaining is set as 0.
	 */
	cycles_remaining?: number
	/**
	 * The active pricing scheme version for the billing cycle
	 */
	current_pricing_scheme_version?: number
	/**
	 * The number of times this billing cycle gets executed.
	 * Trial billing cycles can only be executed a finite number of times (value between 1 and 999 for total_cycles).
	 * Regular billing cycles can be executed infinite times (value of 0 for total_cycles) or a finite number of times (value between 1 and 999 for total_cycles).
	 */
	total_cycles?: number
}

export interface CapturePayment {
	/**
	 * The reason or note for the subscription charge.
	 */
	notes: string
	/**
	 * The type of capture.
	 * - OUTSTANDING_BALANCE: The outstanding balance that the subscriber must clear.
	 */
	capture_type: 'OUTSTANDING_BALANCE'
	/**
	 * The currency and amount for a financial transaction, such as a balance or payment due.
	 */
	amount: AmountPrice
}

export interface Transaction {
	/**
	 * The status of the captured payment.
	 */
	status?: PaymentStatus
	/**
	 * The PayPal-generated transaction ID.
	 */
	id: string
	/**
	 * The breakdown details for the amount. Includes the gross, tax, fee, and shipping amounts.
	 */
	amount_with_breakdown: AmountWithBreakdown
	/**
	 * The name of the customer.
	 */
	payer_name?: PayerName
	/**
	 * The email ID of the customer.
	 */
	payer_email?: string
	/**
	 * The date and time when the transaction was processed, in Internet date and time format.
	 * @see https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	time: string
}

export interface AmountWithBreakdown {
	/**
	 * The amount for this transaction.
	 */
	gross_amount: AmountPrice
	/**
	 * The item total for the transaction.
	 */
	total_item_amount?: AmountPrice
	/**
	 * The fee details for the transaction.
	 */
	fee_amount?: AmountPrice
	/**
	 * The shipping amount for the transaction.
	 */
	shipping_amount?: AmountPrice
	/**
	 * The tax amount for the transaction.
	 */
	tax_amount?: AmountPrice
	/**
	 * The net amount that the payee receives for this transaction in their PayPal account.
	 * The net amount is computed as gross_amount minus the paypal_fee.
	 */
	net_amount?: AmountPrice
}

export interface PayerName {
	/**
	 * The prefix, or title, to the party's name.
	 */
	prefix?: string
	/**
	 * When the party is a person, the party's given, or first, name.
	 */
	given_name?: string
	/**
	 * When the party is a person, the party's surname or family name.
	 * Also known as the last name.
	 * Required when the party is a person.
	 * Use also to store multiple surnames including the matronymic, or mother's, surname.
	 */
	surname?: string
	/**
	 * When the party is a person, the party's middle name. Use also to store multiple middle names including the patronymic, or father's, middle name.
	 */
	middle_name?: string
	/**
	 * The suffix for the party's name.
	 */
	suffix?: string
	/**
	 * The party's alternate name. Can be a business name, nickname, or any other name that cannot be split into first, last name.
	 * Required when the party is a business.
	 * @DEPRECATED
	 */
	alternate_full_name?: string
	/**
	 * When the party is a person, the party's full name.
	 */
	full_name?: string
}

export interface ListParams {
	/**
	 * The start date and time for the range of transactions to list.
	 * The query uses the ISO 8601 date and time format. For example, 2019-08-20T00:00:00Z represents August 20, 2019 UTC 00:00:00.
	 */
	start_time?: string
	/**
	 * The end date and time for the range of transactions to list.
	 * The query uses the ISO 8601 date and time format. For example, 2019-08-20T00:00:00Z represents August 20, 2019 UTC 00:00:00.
	 */
	end_time?: string
}

export interface ListResponse {
	transactions: Transaction[]
	/**
	 * The total number of items.
	 */
	total_items: number
	/**
	 * The total number of pages.
	 */
	total_pages: number
	/**
	 * The HATEOAS links related to this call, including the next, previous, and current page links.
	 * @see https://developer.paypal.com/docs/api/overview/#hateoas-links
	 */
	links: Link[]
}
