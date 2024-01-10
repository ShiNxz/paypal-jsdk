import type { Address, AmountPrice, CardNetwork, Name, Phone } from '.'

export interface Order {
	/**
	 * An array of purchase units.
	 * Each purchase unit establishes a contract between a payer and the payee.
	 * Each purchase unit represents either a full or partial order that the payer intends to purchase from the payee.
	 * @required
	 */
	purchase_units: PurchaseUnit[]

	/**
	 * The intent to either capture payment immediately or authorize a payment for an order after order creation.
	 * - `CAPTURE`: The merchant intends to capture payment immediately after the customer makes a payment.
	 * - `AUTHORIZE`: The merchant intends to authorize a payment and place funds on hold after the customer makes a payment.
	 * Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days.
	 * After the three-day honor period, the original authorized payment expires and you must re-authorize the payment.
	 * You must make a separate request to capture payments on demand.
	 * This intent is not supported when you have more than one `purchase_unit` within your order.
	 * @required
	 */
	intent: OrderIntent

	/**
	 * The customer is also known as the payer.
	 * The Payer object was intended to only be used with the `payment_source.paypal` object.
	 * In order to make this design more clear, the details in the `payer` object are now available under `payment_source.paypal`.
	 * Please use `payment_source.paypal.`
	 * @deprecated
	 * @optional
	 */
	payer?: OrderPayer

	/**
	 * The payment source definition.
	 * @optional
	 */
	payment_source?: PaymentSource

	/**
	 * Customize the payer experience during the approval process for the payment with PayPal.
	 * @optional
	 */
	application_context?: ApplicationContext
}

export interface AddOrderTrackingOptions {
	/**
	 * The tracking number for the shipment. This property supports Unicode.
	 * @required
	 */
	tracking_number: string

	/**
	 * The name of the carrier for the shipment.
	 * Provide this value only if the carrier parameter is OTHER.
	 * This property supports Unicode.
	 * @optional
	 */
	carrier_name_other?: string

	/**
	 * The carrier for the shipment.
	 * Some carriers have a global version as well as local subsidiaries.
	 * The subsidiaries are repeated over many countries and might also have an entry in the global list.
	 * Choose the carrier for your country.
	 * If the carrier is not available for your country, choose the global version of the carrier.
	 * If your carrier name is not in the list, set `carrier` to `OTHER` and set carrier name in `carrier_name_other`.
	 * For allowed values, see [Carriers](https://developer.paypal.com/docs/tracking/reference/carriers/).
	 * @required
	 */
	carrier: string

	/**
	 * The PayPal capture ID.
	 * @required
	 */
	capture_id: string

	/**
	 * If true, sends an email notification to the payer of the PayPal transaction. The email contains the tracking information that was uploaded through the API.
	 * @optional
	 * @default { send_to_payer: false }
	 */
	notify_payer?: boolean

	/**
	 * An array of details of items in the shipment.
	 * @optional
	 */
	items?: OrderItem[]
}

export interface OrderItem {
	/**
	 * The item name or title.
	 * @optional
	 */
	name?: string

	/**
	 * The item quantity.
	 * Must be a whole number.
	 * @optional
	 */
	quantity?: string

	/**
	 * The stock keeping unit (SKU) for the item.
	 * This can contain unicode characters.
	 * @optional
	 */
	sku?: string

	/**
	 * The URL of the item's image.
	 * File type and size restrictions apply.
	 * An image that violates these restrictions will not be honored.
	 * @optional
	 */
	image_url?: string
}

export interface AuthorizeOrder {
	/**
	 * The source of payment for the order, which can be a token or a card.
	 * Use this object only if you have not redirected the user after order creation to approve the payment.
	 * In such cases, the user-selected payment method in the PayPal flow is implicitly used.
	 * @optional
	 */
	payment_source?: CreatedOrder['payment_source']
}

export interface CreatedOrder extends Order {
	/**
	 * The date and time when the transaction occurred, in Internet date and time format.
	 * @optional
	 */
	create_time?: string

	/**
	 * The date and time when the transaction was last updated, in Internet date and time format.
	 * @optional
	 */
	update_time?: string

	/**
	 * The ID of the order.
	 * @optional
	 */
	id?: string

	/**
	 * The instruction to process an order.
	 *
	 * - `ORDER_COMPLETE_ON_PAYMENT_APPROVAL`: API Caller expects the Order to be auto completed (i.e. for PayPal to authorize or capture depending on the intent) on completion of payer approval. This option is not relevant for payment_source that typically do not require a payer approval or interaction. This option is currently only available for the following payment_source: Alipay, Bancontact, BLIK, boletobancario, eps, giropay, GrabPay, iDEAL, Multibanco, MyBank, OXXO, P24, PayU, PUI, SafetyPay, SatisPay, Sofort, Trustly, Verkkopankki, WeChat Pay
	 * - `NO_INSTRUCTION`: The API caller intends to authorize `v2/checkout/orders/id/authorize` or capture `v2/checkout/orders/id/capture` after the payer approves the order.
	 * @optional
	 * @default
	 * { processing_instruction: "NO_INSTRUCTION" }
	 */
	processing_instruction?: 'ORDER_COMPLETE_ON_PAYMENT_APPROVAL' | 'NO_INSTRUCTION'

	/**
	 * The order status.
	 * @optional
	 */
	status?: OrderStatus
}

export interface ConfirmOrderBody {
	/**
	 * The instruction to process an order.
	 * @optional
	 */
	processing_instruction?: CreatedOrder['processing_instruction']

	/**
	 * Customizes the payer confirmation experience.
	 * @optional
	 */
	application_context?: CreatedOrder['application_context']

	/**
	 * The payment source definition.
	 * @required
	 */
	payment_source: CreatedOrder['payment_source']
}

/**
 * - `CREATED`: The order was created with the specified context.
 * - `SAVED`: The order was saved and persisted. The order status continues to be in progress until a capture is made with final_capture = true for all purchase units within the order.
 * - `APPROVED`: The customer approved the payment through the PayPal wallet or another form of guest or unbranded payment. For example, a card, bank account, or so on.
 * - `VOIDED`: All purchase units in the order are voided.
 * - `COMPLETED`: The payment was authorized or the authorized payment was captured for the order.
 * - `PAYER_ACTION_REQUIRED`: The order requires an action from the payer (e.g. 3DS authentication). Redirect the payer to the "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or capturing the order.
 */
export type OrderStatus = 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED'

export interface ApplicationContext {
	/**
	 * The label that overrides the business name in the PayPal account on the PayPal site.
	 * The fields in `application_context` are now available in the `experience_context` object under the payment_source which supports them (eg. `payment_source.paypal.experience_context.brand_name`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * @deprecated
	 * @optional
	 */
	brand_name?: string

	/**
	 * The type of landing page to show on the PayPal site for customer checkout.
	 * The fields in `application_context` are now available in the experience_context object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.landing_page`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * @deprecated
	 * @optional
	 * @default { landing_page: "NO_PREFERENCE" }
	 */
	landing_page?: 'LOGIN' | 'BILLING' | 'NO_PREFERENCE'

	/**
	 * The shipping preference:
	 * - Displays the shipping address to the customer.
	 * - Enables the customer to choose an address on the PayPal site.
	 * - Restricts the customer from changing the address during the payment-approval process.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.shipping_preference`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 *
	 * - `GET_FROM_FILE`: Use the customer-provided shipping address on the PayPal site.
	 * - `NO_SHIPPING`: Redact the shipping address from the PayPal site. Recommended for digital goods.
	 * - `SET_PROVIDED_ADDRESS`: Use the merchant-provided address. The customer cannot change this address on the PayPal site.
	 *
	 * @deprecated
	 * @optional
	 * @default { shipping_preference: "GET_FROM_FILE" }
	 */
	shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS'

	/**
	 * Configures a Continue or Pay Now checkout flow.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.user_action`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * - `CONTINUE`: After you redirect the customer to the PayPal payment page, a Continue button appears. Use this option when the final amount is not known when the checkout flow is initiated and you want to redirect the customer to the merchant page without processing the payment.
	 * - `PAY_NOW`: After you redirect the customer to the PayPal payment page, a Pay Now button appears. Use this option when the final amount is known when the checkout is initiated and you want to process the payment immediately when the customer clicks Pay Now.
	 * @deprecated
	 * @optional
	 * @default { user_action: "CONTINUE" }
	 */
	user_action?: 'CONTINUE' | 'PAY_NOW'

	/**
	 * The URL where the customer is redirected after the customer approves the payment.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.return_url`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * @deprecated
	 * @optional
	 */
	return_url?: string

	/**
	 * The URL where the customer is redirected after the customer cancels the payment.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.cancel_url`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * @deprecated
	 * @optional
	 */
	cancel_url?: string

	/**
	 * The BCP 47-formatted locale of pages that the PayPal payment experience shows.
	 * PayPal supports a five-character code.
	 * For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`, `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.locale`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object.
	 * @deprecated
	 * @optional
	 */
	locale?: string

	/**
	 * The customer and merchant payment preferences.
	 * The fields in `application_context` are now available in the `experience_context` object under the `payment_source` which supports them (eg. `payment_source.paypal.experience_context.payment_method_selected`).
	 * Please specify this field in the `experience_context` object instead of the `application_context` object..
	 * @deprecated
	 * @optional
	 */
	payment_method?: PaymentMethod

	/**
	 * Provides additional details to process a payment using a `payment_source` that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
	 * Parameter compatibility:
	 * - `payment_type=ONE_TIME` is compatible only with `payment_initiator=CUSTOMER`.
	 * - `usage=FIRST` is compatible only with `payment_initiator=CUSTOMER`.
	 * `previous_transaction_reference` or `previous_network_transaction_reference` is compatible only with `payment_initiator=MERCHANT`.
	 * Only one of the parameters - `previous_transaction_reference` and `previous_network_transaction_reference` - can be present in the request.
	 */
	stored_payment_source?: StoredCredential
}

export interface PaymentMethod {
	/**
	 * NACHA (the regulatory body governing the ACH network) requires that API callers (merchants, partners) obtain the consumer’s explicit authorization before initiating a transaction.
	 * To stay compliant, you’ll need to make sure that you retain a compliant authorization for each transaction that you originate to the ACH Network using this API.
	 * ACH transactions are categorized (using SEC codes) by how you capture authorization from the Receiver (the person whose bank account is being debited or credited).
	 * PayPal supports the following SEC codes.
	 * - `TEL`: The API caller (merchant/partner) accepts authorization and payment information from a consumer over the telephone.
	 * - `WEB`: The API caller (merchant/partner) accepts Debit transactions from a consumer on their website.
	 * - `CCD`: Cash concentration and disbursement for corporate debit transaction. Used to disburse or consolidate funds. Entries are usually Optional high-dollar, low-volume, and time-critical. (e.g. intra-company transfers or invoice payments to suppliers).
	 * - `PPD`: Prearranged payment and deposit entries. Used for debit payments authorized by a consumer account holder, and usually initiated by a company. These are usually recurring debits (such as insurance premiums).
	 * @optional
	 * @default { standard_entry_class_code: "WEB" }
	 */
	standard_entry_class_code?: 'WEB' | 'TEL' | 'CCD' | 'PPD'

	/**
	 * The merchant-preferred payment methods.
	 * - `UNRESTRICTED`: Accepts any type of payment from the customer.
	 * - `IMMEDIATE_PAYMENT_REQUIRED`: Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the `pending` status.
	 * @optional
	 * @default { payment_method_preference: "UNRESTRICTED" }
	 */
	payee_preferred: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED'
}

export interface PaymentSource {
	/**
	 * The payment card to use to fund a payment.
	 * Can be a credit or debit card.
	 * @optional
	 */
	card?: CardSource

	/**
	 * The tokenized payment source to fund a payment.
	 * @optional
	 */
	token?: TokenSource

	/**
	 * Indicates that PayPal Wallet is the payment source.
	 * Main use of this selection is to provide additional instructions associated with this choice like vaulting.
	 * @optional
	 */
	paypal?: PaypalPaymentSource

	/**
	 * Bancontact is the most popular online payment in Belgium.
	 * [More Details](https://www.bancontact.com/).
	 * @optional
	 */
	bancontact?: BancontactPaymentSource

	/**
	 * ApplePay payment source, allows buyer to pay using ApplePay, both on Web as well as on Native.
	 * @optional
	 */
	apple_pay?: ApplePayPaymentSource

	blik?: UnTypedPaymentSource
	eps?: UnTypedPaymentSource
	giropay?: UnTypedPaymentSource
	ideal?: UnTypedPaymentSource
	mybank?: UnTypedPaymentSource
	p24?: UnTypedPaymentSource
	sofort?: UnTypedPaymentSource
	trustly?: UnTypedPaymentSource
	venmo?: UnTypedPaymentSource
}

export interface UnTypedPaymentSource {
	[other: string]: any
}

export interface ApplePayPaymentSource {
	/**
	 * ApplePay transaction identifier, this will be the unique identifier for this transaction provided by Apple.
	 * The pattern is defined by an external party and supports Unicode.
	 * @optional
	 */
	id?: string

	/**
	 * Provides additional details to process a payment using a card that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
	 *
	 * Parameter compatibility:
	 * - `payment_type=ONE_TIME` is compatible only with `payment_initiator=CUSTOMER`.
	 * - `usage=FIRST` is compatible only with `payment_initiator=CUSTOMER`.
	 * - `previous_transaction_reference` or `previous_network_transaction_reference` is compatible only with `payment_initiator=MERCHANT`.
	 * - Only one of the parameters - `previous_transaction_reference` and `previous_network_transaction_reference` - can be present in the request.
	 */
	stored_credential?: ApplePayStoredCredential

	/**
	 * Name on the account holder associated with apple pay.
	 * @optional
	 */
	name?: string

	/**
	 * The email address of the account holder associated with apple pay.
	 * @optional
	 */
	email_address?: string

	/**
	 * The phone number, in its canonical international [E.164 numbering plan format](https://www.itu.int/rec/T-REC-E.164/en).
	 * Supports only the `national_number` property.
	 * @optional
	 */
	phone_number?: Phone['phone_number']

	/**
	 * The decrypted payload details for the apple pay token.
	 * @optional
	 */
	decrypted_token?: ApplePayDecryptedToken

	/**
	 * The PayPal-generated ID for the saved apple pay payment_source.
	 * This ID should be stored on the merchant's server so the saved payment source can be used for future transactions.
	 */
	vault_id?: string
}

export interface ApplePayDecryptedToken {
	/**
	 * Apple Pay Hex-encoded device manufacturer identifier. The pattern is defined by an external party and supports Unicode.
	 * @optional
	 */
	device_manufacturer_id?: string

	/**
	 * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE and for China it is EMV.
	 * - `3DSECURE`: The card was authenticated using 3D Secure (3DS) authentication scheme. While using this value make sure to populate cryptogram and eci_indicator as part of payment data.
	 * - `EMV`: The card was authenticated using EMV method, which is applicable for China. While using this value make sure to pass emv_data and pin as part of payment data.
	 * @default { payment_data_type: "3DSECURE" }
	 * @optional
	 */
	payment_data_type: '3DSECURE' | 'EMV'

	/**
	 * The transaction amount for the payment that the payer has approved on apple platform.
	 * @optional
	 */
	transaction_amount?: AmountPrice

	/**
	 * Apple Pay tokenized credit card used to pay.
	 * @optional
	 */
	tokenized_card?: CardSource
}

export interface ApplePayStoredCredential {
	/**
	 * The person or party who initiated or triggered the payment.
	 * - `CUSTOMER`: Payment is initiated with the active engagement of the customer. e.g. a customer checking out on a merchant website.
	 * - `MERCHANT`: Payment is initiated by merchant on behalf of the customer without the active engagement of customer. e.g. a merchant charging the monthly payment of a subscription to the customer.
	 * @required
	 */
	payment_initiator: 'CUSTOMER' | 'MERCHANT'

	/**
	 * Indicates the type of the stored `payment_source` payment.
	 * - `ONE_TIME`: One Time payment such as online purchase or donation. (e.g. Checkout with one-click).
	 * - `RECURRING`: Payment which is part of a series of payments with fixed or variable amounts, following a fixed time interval. (e.g. Subscription payments).
	 * - `UNSCHEDULED`: Payment which is part of a series of payments that occur on a non-fixed schedule and/or have variable amounts. (e.g. Account Topup payments).
	 * @required
	 */
	payment_type: 'ONE_TIME' | 'RECURRING' | 'UNSCHEDULED'

	/**
	 * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also referred to as stored credential or card on file).
	 * - `FIRST`: Indicates the Initial/First payment with a payment_source that is intended to be stored upon successful processing of the payment.
	 * - `SUBSEQUENT`: Indicates a payment using a stored payment_source which has been successfully used previously for a payment.
	 * - `DERIVED`: Indicates that PayPal will derive the value of FIRST or SUBSEQUENT based on data available to PayPal.
	 * @default { usage: "DERIVED" }
	 * @optional
	 */
	usage?: 'FIRST' | 'SUBSEQUENT' | 'DERIVED'

	/**
	 * Reference values used by the card network to identify a transaction.
	 * @optional
	 */
	previous_network_transaction_reference?: PreviousNetworkTransactionReference
}

export interface BancontactPaymentSource {
	/**
	 * The name of the account holder associated with this payment method.
	 * @required
	 */
	name: string

	/**
	 * The two-character ISO 3166-1 country code.
	 * @required
	 */
	country_code: string

	/**
	 * Customizes the payer experience during the approval process for the payment.
	 * @optional
	 */
	experience_context?: BancontactExperienceContext
}

export interface BancontactExperienceContext {
	/**
	 * The label that overrides the business name in the PayPal account on the PayPal site. The pattern is defined by an external party and supports Unicode.
	 * @optional
	 */
	brand_name?: string

	/**
	 * The location from which the shipping address is derived.
	 * @optional
	 * @default { shipping_preference: "GET_FROM_FILE" }
	 */
	shipping_preference?: ShippingPerference

	/**
	 * The BCP 47-formatted locale of pages that the PayPal payment experience shows.
	 * PayPal supports a five-character code.
	 * For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`, `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
	 * @optional
	 */
	locale?: string

	/**
	 * The URL where the customer will be redirected upon approving a payment.
	 * @optional
	 */
	return_url?: string

	/**
	 * The URL where the customer will be redirected upon cancelling the payment approval.
	 * @optional
	 */
	cancel_url?: string
}

export interface PaypalPaymentSource {
	/**
	 * Customizes the payer experience during the approval process for payment with PayPal.
	 *
	 * * Note: Partners and Marketplaces might configure `brand_name` and `shipping_preference` during partner account setup, which overrides the request values.
	 * @optional
	 */
	experience_context?: PaypalExperienceContext

	/**
	 * The PayPal billing agreement ID. References an approved recurring payment for goods or services.
	 * @optional
	 */
	billing_agreement_id?: string

	/**
	 * The PayPal-generated ID for the payment_source stored within the Vault.
	 * @optional
	 */
	vault_id?: string

	/**
	 * The email address of the PayPal account holder.
	 * @optional
	 */
	email_address?: string

	/**
	 * The name of the PayPal account holder. Supports only the `given_name` and `surname` properties.
	 * @optional
	 */
	name?: Name

	/**
	 * The phone number of the customer.
	 * Available only when you enable the Contact Telephone Number option in the [Profile & Settings](https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-website-payments&_ga=2.74503634.1795084420.1703891260-1944583344.1698732461) for the merchant's PayPal account.
	 * The `phone.phone_number` supports only `national_number`.
	 * @optional
	 */
	phone?: Phone

	/**
	 * The birth date of the PayPal account holder in YYYY-MM-DD format.
	 * @optional
	 */
	birth_date?: string

	/**
	 * The tax information of the payer.
	 * Required only for Brazilian payer's.
	 * Both `tax_id` and `tax_id_type` are required.
	 * @optional
	 */
	tax_info?: TaxInfo

	/**
	 * The address of the person to whom to ship the items.
	 * Supports only the `address_line_1`, `address_line_2`, `admin_area_1`, `admin_area_2`, `postal_code`, and `country_code` properties.
	 * @optional
	 */
	address?: Address

	/**
	 * Attributes used to provide the instructions during vaulting of the PayPal Wallet.
	 * @optional
	 */
	attributes?: PaypalAttributes
}

export interface PaypalAttributesCustomer {
	/**
	 * The unique ID for a customer generated by PayPal.
	 * @optional
	 */
	id?: string
}

export interface PaypalVaultAttributes {
	/**
	 * Defines how and when the payment source gets vaulted.
	 * @optional
	 */
	store_in_vault?: StoreInVault

	/**
	 * The description displayed to PayPal consumer on the approval flow for PayPal, as well as on the PayPal payment token management experience on PayPal.com.
	 * @optional
	 */
	description?: string

	/**
	 * Expected business/pricing model for the billing agreement.
	 * @optional
	 */
	usage_pattern?: string

	/**
	 * The usage type associated with the PayPal payment token.
	 * @required
	 */
	usage_type: string

	/**
	 * The customer type associated with the PayPal payment token.
	 * This is to indicate whether the customer acting on the merchant / platform is either a business or a consumer.
	 * @optional
	 * @default { customer_type: "CONSUMER" }
	 */
	customer_type?: string

	/**
	 * Create multiple payment tokens for the same payer, merchant/platform combination.
	 * Use this when the customer has not logged in at merchant/platform.
	 * The payment token thus generated, can then also be used to create the customer account at merchant/platform.
	 * Use this also when multiple payment tokens are required for the same payer, different customer at merchant/platform.
	 * This helps to identify customers distinctly even though they may share the same PayPal account.
	 * This only applies to PayPal payment source.
	 * @optional
	 * @default { multiple_use: false }
	 */
	permit_multiple_payment_tokens?: boolean
}

/**
 * - `ON_SUCCESS`: Defines that the payment_source will be vaulted only when at least one authorization or capture using that payment_source is successful.
 */
export type StoreInVault = 'ON_SUCCESS'

export interface PaypalAttributes {
	/**
	 * The details about a customer in PayPal's system of record.
	 * @optional
	 */
	customer?: PaypalAttributesCustomer

	/**
	 * Attributes used to provide the instructions during vaulting of the PayPal Wallet.
	 * @optional
	 */
	vault?: PaypalVaultAttributes
}

export interface PaypalExperienceContext {
	/**
	 * The label that overrides the business name in the PayPal account on the PayPal site. The pattern is defined by an external party and supports Unicode.
	 * @optional
	 */
	brand_name?: string

	/**
	 * The location from which the shipping address is derived.
	 * @optional
	 * @default { shipping_preference: "GET_FROM_FILE" }
	 */
	shipping_preference?: ShippingPerference

	/**
	 * The type of landing page to show on the PayPal site for customer checkout.
	 * @optional
	 * @default { landing_page: "NO_PREFERENCE" }
	 */
	landing_page?: LandingPage

	/**
	 * Configures a Continue or Pay Now checkout flow.
	 * @optional
	 * @default { user_action: "CONTINUE" }
	 */
	user_action?: UserAction

	/**
	 * The merchant-preferred payment methods.
	 * - `UNRESTRICTED`: Accepts any type of payment from the customer.
	 * - `IMMEDIATE_PAYMENT_REQUIRED`: Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the `pending` status.
	 * @optional
	 * @default { payment_method_preference: "UNRESTRICTED" }
	 */
	payment_method_preference?: PaymentMethodPreference

	/**
	 * The BCP 47-formatted locale of pages that the PayPal payment experience shows.
	 * PayPal supports a five-character code.
	 * For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`, `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
	 * @optional
	 */
	locale?: string

	/**
	 * The URL where the customer will be redirected upon approving a payment.
	 * @optional
	 */
	return_url?: string

	/**
	 * The URL where the customer will be redirected upon cancelling the payment approval.
	 * @optional
	 */
	cancel_url?: string
}

/**
 * The merchant-preferred payment methods.
 * - `CONTINUE`: After you redirect the customer to the PayPal payment page, a Continue button appears. Use this option when the final amount is not known when the checkout flow is initiated and you want to redirect the customer to the merchant page without processing the payment.
 * - `PAY_NOW`: After you redirect the customer to the PayPal payment page, a Pay Now button appears. Use this option when the final amount is known when the checkout is initiated and you want to process the payment immediately when the customer clicks Pay Now.
 */
export type UserAction = 'CONTINUE' | 'PAY_NOW'

/**
 * - `UNRESTRICTED`: Accepts any type of payment from the customer.
 * - `IMMEDIATE_PAYMENT_REQUIRED`: Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the `pending` status.
 */
export type PaymentMethodPreference = 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED'

export interface TokenSource {
	/**
	 * The PayPal-generated ID for the token.
	 * @required
	 */
	id: string

	/**
	 * The tokenization method that generated the ID.
	 * - `BILLING_AGREEMENT`: The PayPal billing agreement ID. References an approved recurring payment for goods or services.
	 */
	type: 'BILLING_AGREEMENT'
}

/**
 * - `GET_FROM_FILE`: Get the customer-provided shipping address on the PayPal site.
 * - `NO_SHIPPING`: Redacts the shipping address from the PayPal site. Recommended for digital goods.
 * - `SET_PROVIDED_ADDRESS`: Get the merchant-provided address. The customer cannot change this address on the PayPal site. If merchant does not pass an address, customer can choose the address on PayPal pages.
 */
export type ShippingPerference = 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS'

/**
 * - `LOGIN`: When the customer clicks PayPal Checkout, the customer is redirected to a page to log in to PayPal and approve the payment.
 * - `GUEST_CHECKOUT`: When the customer clicks PayPal Checkout, the customer is redirected to a page to enter credit or debit card and other relevant billing information required to complete the purchase. This option has previously been also called as 'BILLING'
 * - `NO_PREFERENCE`: When the customer clicks PayPal Checkout, the customer is redirected to either a page to log in to PayPal and approve the payment or to a page to enter credit or debit card and other relevant billing information required to complete the purchase, depending on their previous interaction with PayPal.
 */
export type LandingPage = 'LOGIN' | 'GUEST_CHECKOUT' | 'NO_PREFERENCE'

export interface CardSource {
	/**
	 * The card holder's name as it appears on the card.
	 * @optional
	 */
	name?: string

	/**
	 * The primary account number (PAN) for the payment card.
	 * @optional
	 */
	number?: string

	/**
	 * The three- or four-digit security code of the card.
	 * Also known as the CVV, CVC, CVN, CVE, or CID.
	 * This parameter cannot be present in the request when `payment_initiator=MERCHANT`.
	 * @optional
	 */
	security_code?: string

	/**
	 * The card expiration year and month, in [Internet date format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 * @optional
	 */
	expiry?: string

	/**
	 * The billing address for this card.
	 * Supports only the `address_line_1`, `address_line_2`, `admin_area_1`, `admin_area_2`, `postal_code`, and `country_code` properties.
	 * @optional
	 */
	billing_address?: Address

	/**
	 * Additional attributes associated with the use of this card.
	 * @optional
	 */
	attributes?: CardAttributes

	/**
	 * Provides additional details to process a payment using a `card` that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
	 * Parameter compatibility:
	 * - `payment_type=ONE_TIME` is compatible only with `payment_initiator=CUSTOMER`.
	 * - `usage=FIRST` is compatible only with `payment_initiator=CUSTOMER`.
	 * - `previous_transaction_reference` or `previous_network_transaction_reference` is compatible only with `payment_initiator=MERCHANT`.
	 * - Only one of the parameters - `previous_transaction_reference` and `previous_network_transaction_reference` - can be present in the request.
	 * @optional
	 */
	stored_credential?: StoredCredential

	/**
	 * The PayPal-generated ID for the saved card payment source. Typically stored on the merchant's server.
	 * @optional
	 */
	vault_id?: string

	/**
	 * A 3rd party network token refers to a network token that the merchant provisions from and vaults with an external TSP (Token Service Provider) other than PayPal.
	 * @optional
	 */
	network_token?: NetworkToken

	/**
	 * Customizes the payer experience during the 3DS Approval for payment.
	 * @optional
	 */
	experience_context?: ExperienceContext
}

export interface NetworkToken {
	/**
	 * Third party network token number.
	 * @required
	 */
	number: string

	/**
	 * An Encrypted one-time use value that's sent along with Network Token. This field is not required to be present for recurring transactions.
	 * @optional
	 */
	cryptogram?: string

	/**
	 * A TRID, or a Token Requestor ID, is an identifier used by merchants to request network tokens from card networks.
	 * A TRID is a precursor to obtaining a network token for a credit card primary account number (PAN), and will aid in enabling secure card on file (COF) payments and reducing fraud.
	 * @optional
	 */
	token_requestor_id?: string

	/**
	 * The card expiration year and month, in Internet date format.
	 * @required
	 */
	expiry: string

	/**
	 * Electronic Commerce Indicator (ECI). The ECI value is part of the 2 data elements that indicate the transaction was processed electronically.
	 * This should be passed on the authorization transaction to the Gateway/Processor.
	 * @optional
	 */
	eci_flag?: ECI_Flag
}

/**
 * - `MASTERCARD_NON_3D_SECURE_TRANSACTION`: Mastercard non-3-D Secure transaction.
 * - `MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION`: Mastercard attempted authentication transaction.
 * - `MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION`: Mastercard fully authenticated transaction.
 * - `FULLY_AUTHENTICATED_TRANSACTION`: VISA, AMEX, JCB, DINERS CLUB fully authenticated transaction.
 * - `ATTEMPTED_AUTHENTICATION_TRANSACTION`: VISA, AMEX, JCB, DINERS CLUB attempted authentication transaction.
 * - `NON_3D_SECURE_TRANSACTION`: VISA, AMEX, JCB, DINERS CLUB non-3-D Secure transaction.
 */
export type ECI_Flag =
	| 'MASTERCARD_NON_3D_SECURE_TRANSACTION'
	| 'MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION'
	| 'MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION'
	| 'FULLY_AUTHENTICATED_TRANSACTION'
	| 'ATTEMPTED_AUTHENTICATION_TRANSACTION'
	| 'NON_3D_SECURE_TRANSACTION'

export interface ExperienceContext {
	/**
	 * The URL where the customer will be redirected upon successfully completing the 3DS challenge.
	 * @optional
	 */
	return_url?: string

	/**
	 * The URL where the customer will be redirected upon cancelling the 3DS challenge.
	 */
	cancel_url?: string
}

export interface StoredCredential {
	/**
	 * The person or party who initiated or triggered the payment.
	 * - CUSTOMER: Payment is initiated with the active engagement of the customer. e.g. a customer checking out on a merchant website.
	 * - MERCHANT: Payment is initiated by merchant on behalf of the customer without the active engagement of customer. e.g. a merchant charging the monthly payment of a subscription to the customer.
	 * @required
	 */
	payment_initiator: 'CUSTOMER' | 'MERCHANT'

	/**
	 * Indicates the type of the stored payment_source payment.
	 * - ONE_TIME: One Time payment such as online purchase or donation. (e.g. Checkout with one-click).
	 * - RECURRING: Payment which is part of a series of payments with fixed or variable amounts, following a fixed time interval. (e.g. Subscription payments).
	 * - UNSCHEDULED: Payment which is part of a series of payments that occur on a non-fixed schedule and/or have variable amounts. (e.g. Account Topup payments).
	 * @required
	 */
	payment_type: 'ONE_TIME' | 'RECURRING' | 'UNSCHEDULED'

	/**
	 * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also referred to as stored credential or card on file).
	 * - FIRST: Indicates the Initial/First payment with a payment_source that is intended to be stored upon successful processing of the payment.
	 * - SUBSEQUENT: Indicates a payment using a stored payment_source which has been successfully used previously for a payment.
	 * - DERIVED: Indicates that PayPal will derive the value of FIRST or SUBSEQUENT based on data available to PayPal.
	 * @default { usage: "DERIVED" }
	 * @optional
	 */
	usage?: 'FIRST' | 'USED' | 'DERIVED'

	/**
	 * Reference values used by the card network to identify a transaction.
	 * @optional
	 */
	previous_network_transaction_reference?: PreviousNetworkTransactionReference
}

export interface PreviousNetworkTransactionReference {
	/**
	 * Transaction reference id returned by the scheme.
	 * For Visa and Amex, this is the "Tran id" field in response.
	 * For MasterCard, this is the "BankNet reference id" field in response.
	 * For Discover, this is the "NRID" field in response.
	 * The pattern we expect for this field from Visa/Amex/CB/Discover is numeric, Mastercard/BNPP is alphanumeric and Paysecure is alphanumeric with special character -.
	 * @required
	 */
	id: string

	/**
	 * The date that the transaction was authorized by the scheme.
	 * This field may not be returned for all networks. MasterCard refers to this field as "BankNet reference date.
	 */
	date?: string

	/**
	 * Reference ID issued for the card transaction. This ID can be used to track the transaction across processors, card brands and issuing banks.
	 * @optional
	 */
	acquirer_reference_number?: string

	/**
	 * Name of the card network through which the transaction was routed.
	 * @optional
	 */
	network?: CardNetwork
}

export interface CardAttributes {
	/**
	 * The details about a customer in PayPal's system of record.
	 * @optional
	 */
	customer?: Customer

	/**
	 * Instruction to vault the card based on the specified strategy.
	 * @optional
	 */
	vault?: {
		/**
		 * Defines how and when the payment source gets vaulted.
		 * - ON_SUCCESS: Defines that the payment_source will be vaulted only when at least one authorization or capture using that payment_source is successful.
		 * @optional
		 */
		store_in_vault?: boolean
	}
}

export interface Customer {
	/**
	 * The unique ID for a customer generated by PayPal.
	 * @optional
	 */
	id?: string

	/**
	 * Email address of the buyer as provided to the merchant or on file with the merchant. Email Address is required if you are processing the transaction using PayPal Guest Processing which is offered to select partners and merchants. For all other use cases we do not expect partners/merchant to send email_address of their customer.
	 * @optional
	 */
	email_address?: string

	/**
	 * The phone number of the buyer as provided to the merchant or on file with the merchant.
	 * The `phone.phone_number` supports only `national_number`.
	 */
	phone?: Phone
}

export interface OrderPayer {
	/**
	 * The email address of the payer.
	 * @optional
	 */
	email_address?: string

	/**
	 * The name of the payer.
	 * Supports only the `given_name` and `surname` properties.
	 * @optional
	 */
	name?: Name

	/**
	 * The phone number of the customer.
	 * Available only when you enable the Contact Telephone Number option in the [Profile & Settings](https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-website-payments&_ga=2.69261776.1795084420.1703891260-1944583344.1698732461) for the merchant's PayPal account.
	 * The `phone.phone_number` supports only `national_number`
	 * @optional
	 */
	phone?: Phone

	/**
	 * The birth date of the payer in `YYYY-MM-DD` format.
	 * @optional
	 */
	birth_date?: string

	/**
	 * The tax information of the payer.
	 * Required only for Brazilian payer's.
	 * Both `tax_id` and `tax_id_type` are required.
	 * @optional
	 */
	tax_info?: TaxInfo

	/**
	 * The address of the person to whom to ship the items.
	 * Supports only the `address_line_1`, `address_line_2`, `admin_area_1`, `admin_area_2`, `postal_code`, and `country_code` properties.
	 * @optional
	 */
	address?: Address
}

export interface TaxInfo {
	/**
	 * The customer's tax ID value.
	 * @required
	 */
	tax_id: string
	/**
	 * The customer's tax ID type.
	 * - BR_CPF: The individual tax ID type, typically is 11 characters long.
	 * - BR_CNPJ: The business tax ID type, typically is 14 characters long.
	 * @required
	 */
	tax_id_type: 'BR_CPF' | 'BR_CNPJ'
}

/**
 * - `CAPTURE`: The merchant intends to capture payment immediately after the customer makes a payment.
 * - `AUTHORIZE`: The merchant intends to authorize a payment and place funds on hold after the customer makes a payment.
 * Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days.
 * After the three-day honor period, the original authorized payment expires and you must re-authorize the payment.
 * You must make a separate request to capture payments on demand.
 * This intent is not supported when you have more than one `purchase_unit` within your order.
 */
export type OrderIntent = 'CAPTURE' | 'AUTHORIZE'

export interface PurchaseUnit {
	/**
	 * The API caller-provided external ID for the purchase unit.
	 * Required for multiple purchase units when you must update the order through `PATCH`.
	 * If you omit this value and the order contains only one purchase unit, PayPal sets this value to `default`.
	 * @optional
	 */
	reference_id?: string

	/**
	 * The purchase description.
	 * The maximum length of the character is dependent on the type of characters used.
	 * The character length is specified assuming a US ASCII character.
	 * Depending on type of character; (e.g. accented character, Japanese characters) the number of characters that that can be specified as input might not equal the permissible max length.
	 * @optional
	 */
	description?: string

	/**
	 * The API caller-provided external ID. Used to reconcile client transactions with PayPal transactions.
	 * Appears in transaction and settlement reports but is not visible to the payer.
	 * @optional
	 */
	custom_id?: string

	/**
	 * The API caller-provided external invoice number for this order.
	 * Appears in both the payer's transaction history and the emails that the payer receives.
	 * @optional
	 */
	invoice_id?: string

	/**
	 * The soft descriptor is the dynamic text used to construct the statement descriptor that appears on a payer's card statement.
	 *
	 * If an Order is paid using the "PayPal Wallet", the statement descriptor will appear in following format on the payer's card statement: `PAYPAL_prefix+(space)+merchant_descriptor+(space)+ soft_descriptor`
	 *
	 * Note: The merchant descriptor is the descriptor of the merchant’s payment receiving preferences which can be seen by logging into the merchant account https://www.sandbox.paypal.com/businessprofile/settings/info/edit
	 * The PAYPAL prefix uses 8 characters. Only the first 22 characters will be displayed in the statement.
	 * For example, if:
	 * The PayPal prefix toggle is PAYPAL *.
	 * The merchant descriptor in the profile is Janes Gift.
	 * The soft descriptor is 800-123-1234.\
	 * Then, the statement descriptor on the card is PAYPAL * Janes Gift 80.
	 *
	 * The PAYPAL prefix uses 8 characters.
	 * Only the first 22 characters will be displayed in the statement.
	 * For example, if:
	 * - The PayPal prefix toggle is `PAYPAL *`.
	 * - The merchant descriptor in the profile is Janes Gift.
	 * The soft descriptor is 800-123-1234.
	 * Then, the statement descriptor on the card is `PAYPAL * Janes Gift 80`.
	 * @optional
	 */
	soft_descriptor?: string

	/**
	 * An array of items that the customer purchases from the merchant.
	 * @optional
	 */
	items?: Item[]

	/**
	 * The total order amount with an optional breakdown that provides details, such as the total item amount, total tax amount, shipping, handling, insurance, and discounts, if any.
	 * If you specify `amount.breakdown`, the amount equals `item_total` plus `tax_total` plus `shipping` plus `handling` plus `insurance` minus `shipping_discount` minus discount.
	 * The amount must be a positive number. The `amount.value` field supports up to 15 digits preceding the decimal.
	 * For a list of supported currencies, decimal precision, and maximum charge amount, see the PayPal REST APIs [Currency Codes](https://developer.paypal.com/api/rest/reference/currency-codes/).
	 * @required
	 */
	amount: AmountWithBreakdown

	/**
	 * The merchant who receives payment for this transaction.
	 * @optional
	 */
	payee?: Payee

	/**
	 * Any additional payment instructions to be consider during payment processing.
	 * This processing instruction is applicable for Capturing an order or Authorizing an Order.
	 * @optional
	 */
	payment_instruction?: PaymentInstruction
}

export interface AmountWithBreakdown extends AmountPrice {
	/**
	 * Breakdown of the amount.
	 * @optional
	 */
	breakdown?: {
		/**
		 * The subtotal for all items. Required if the request includes `purchase_units[].items[].unit_amount`.
		 * Must equal the sum of (`items[].unit_amount * items[].quantity`) for all items.
		 * `item_total.value` can not be a negative number.
		 * @optional
		 */
		item_total?: AmountPrice

		/**
		 * The shipping fee for all items within a given `purchase_unit`.
		 * shipping.value can not be a negative number.
		 * @optional
		 */
		shipping?: AmountPrice

		/**
		 * The handling fee for all items within a given `purchase_unit`.
		 * `handling.value` can not be a negative number.
		 * @optional
		 */
		handling?: AmountPrice

		/**
		 * The total tax for all items.
		 * Required if the request includes `purchase_units`.items.tax. Must equal the sum of (`items[].tax * items[].quantity`) for all items.
		 * `tax_total.value` can not be a negative number.
		 * @optional
		 */
		tax_total?: AmountPrice

		/**
		 * The insurance fee for all items within a given `purchase_unit`.
		 * `insurance.value` can not be a negative number.
		 * @optional
		 */
		insurance?: AmountPrice

		/**
		 * The shipping discount for all items within a given `purchase_unit`.
		 * `shipping_discount.value` can not be a negative number.
		 */
		shipping_discount?: AmountPrice

		/**
		 * The discount for all items within a given `purchase_unit`.
		 * `discount.value` can not be a negative number.
		 */
		discount?: AmountPrice
	}
}

export interface PaymentInstruction {
	/**
	 * An array of various fees, commissions, tips, or donations.
	 * This field is only applicable to merchants that been enabled for PayPal Commerce Platform for Marketplaces and Platforms capability.
	 * @optional
	 */
	platform_fees?: PlatformFee[]

	/**
	 * This field is only enabled for selected merchants/partners to use and provides the ability to trigger a specific pricing rate/plan for a payment transaction.
	 * The list of eligible 'payee_pricing_tier_id' would be provided to you by your Account Manager.
	 * Specifying values other than the one provided to you by your account manager would result in an error.
	 * @optional
	 */
	payee_pricing_tier_id?: string

	/**
	 * FX identifier generated returned by PayPal to be used for payment processing in order to honor FX rate (for eligible integrations) to be used when amount is settled/received into the payee account.
	 * @optional
	 */
	payee_receivable_fx_rate_id?: string

	/**
	 * The funds that are held payee by the marketplace/platform.
	 * This field is only applicable to merchants that been enabled for PayPal Commerce Platform for Marketplaces and Platforms capability.
	 * @default { disbursement_mode: 'INSTANT'}
	 * @optional
	 */
	disbursement_mode?: DisbursementMode

	/**
	 * The name and address of the person to whom to ship the items.
	 * @optional
	 */
	shipping?: Shipping
}

export interface Shipping {
	/**
	 * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup.
	 * Either type or options but not both may be present.
	 * - SHIPPING - The payer intends to receive the items at a specified address.
	 * - PICKUP_IN_PERSON - The payer intends to pick up the items from the payee in person.
	 */
	type?: 'SHIPPING' | 'PICKUP_IN_PERSON'

	/**
	 * An array of shipping options that the payee or merchant offers to the payer to ship or pick up their items.
	 * @optional
	 */
	options?: ShippingOption[]

	/**
	 * The name of the person to whom to ship the items. Supports only the `full_name` property.
	 * @optional
	 */
	name?: Name

	/**
	 * The address of the person to whom to ship the items.
	 * Supports only the `address_line_1`, `address_line_2`, `admin_area_1`, `admin_area_2`, `postal_code`, and `country_code` properties.
	 * @optional
	 */
	address?: Address

	/**
	 * Contains Supplementary Data.
	 */
	supplementary_data: SupplementaryData
}

export interface SupplementaryData {
	/**
	 * Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs.
	 * For more information about processing payments, see [checkout](https://developer.paypal.com/docs/checkout/advanced/processing/) or [multiparty checkout](https://developer.paypal.com/docs/multiparty/checkout/advanced/processing/).
	 * @optional
	 */
	card?: SupplementaryDataCard
}

export interface SupplementaryDataCard {
	/**
	 * The level 2 card processing data collections.
	 * If your merchant account has been configured for Level 2 processing this field will be passed to the processor on your behalf.
	 * Please contact your PayPal Technical Account Manager to define level 2 data for your business.
	 * @optional
	 */
	level_2?: Level2Card
	/**
	 * The level 3 card processing data collections, If your merchant account has been configured for Level 3 processing this field will be passed to the processor on your behalf.
	 * Please contact your PayPal Technical Account Manager to define level 3 data for your business.
	 * @optional
	 */
	level_3?: Level3Card
}

export interface Level2Card {
	/**
	 * Use this field to pass a purchase identification value of up to 12 ASCII characters for AIB and 17 ASCII characters for all other processors.
	 */
	invoice_id?: string
	/**
	 * Use this field to break down the amount of tax included in the total purchase amount.
	 * The value provided here will not add to the total purchase amount.
	 * The value can't be negative, and in most cases, it must be greater than zero in order to qualify for lower interchange rates.
	 * Value, by country, is:
	 * ```json
	 * UK. A county.
	 * US. A state.
	 * Canada. A province.
	 * Japan. A prefecture.
	 * Switzerland. A kanton.
	 * ```
	 * @optional
	 */
	tax_total?: AmountPrice
}

export interface Level3Card {
	/**
	 * Use this field to specify the postal code of the shipping location.
	 * @optional
	 */
	ships_from_postal_code?: string

	/**
	 * A list of the items that were purchased with this payment.
	 * If your merchant account has been configured for Level 3 processing this field will be passed to the processor on your behalf.
	 * @optional
	 */
	line_items?: LineItem[]

	/**
	 * Use this field to break down the shipping cost included in the total purchase amount.
	 * The value provided here will not add to the total purchase amount.
	 * The value cannot be negative.
	 * @optional
	 */
	shipping_amount?: AmountPrice

	/**
	 * Use this field to break down the duty amount included in the total purchase amount.
	 * The value provided here will not add to the total purchase amount.
	 * The value cannot be negative.
	 * @optional
	 */
	duty_amount?: AmountPrice

	/**
	 * Use this field to break down the discount amount included in the total purchase amount.
	 * The value provided here will not add to the total purchase amount.
	 * The value cannot be negative.
	 * @optional
	 */
	discount_amount?: AmountPrice

	/**
	 * The address of the person to whom to ship the items.
	 * Supports only the `address_line_1`, `address_line_2`, `admin_area_1`, `admin_area_2`, `postal_code`, and `country_code` properties.
	 * @optional
	 */
	shipping_address?: Address
}

export interface LineItem extends Item {
	/**
	 * Code used to classify items purchased and track the total amount spent across various categories of products and services.
	 * Different corporate purchasing organizations may use different standards, but the United Nations Standard Products and Services Code (UNSPSC) is frequently used.
	 * @optional
	 */
	commodity_code?: string

	/**
	 * Unit of measure is a standard used to express the magnitude of a quantity in international trade.
	 * Most commonly used (but not limited to) examples are: Acre (ACR), Ampere (AMP), Centigram (CGM), Centimetre (CMT), Cubic inch (INQ), Cubic metre (MTQ), Fluid ounce (OZA), Foot (FOT), Hour (HUR), Item (ITM), Kilogram (KGM), Kilometre (KMT), Kilowatt (KWT), Liquid gallon (GLL), Liter (LTR), Pounds (LBS), Square foot (FTK).
	 * @optional
	 */
	unit_of_measure?: string

	/**
	 * Use this field to break down the discount amount included in the total purchase amount.
	 * The value provided here will not add to the total purchase amount.
	 * The value cannot be negative.
	 * @optional
	 */
	discount_amount?: AmountPrice
	/**
	 * The subtotal for all items.
	 * Must equal the sum of (items[].unit_amount * items[].quantity) for all items.
	 * item_total.value can not be a negative number.
	 * @optional
	 */
	total_amount?: AmountPrice
}

export interface ShippingOption {
	/**
	 * A unique ID that identifies a payer-selected shipping option.
	 * @required
	 */
	id: string
	/**
	 * A description that the payer sees, which helps them choose an appropriate shipping option.
	 * For example, `Free Shipping`, `USPS Priority Shipping`, `Expédition prioritaire USPS`, or `USPS yōuxiān fā huò`.
	 * Localize this description to the payer's locale.
	 * @required
	 */
	label: string
	/**
	 * If the API request sets `selected = true`, it represents the shipping option that the payee or merchant expects to be pre-selected for the payer when they first view the `shipping.options` in the PayPal Checkout experience.
	 * As part of the response if a `shipping.option` contains selected=true, it represents the shipping option that the payer selected during the course of checkout with PayPal.
	 * Only one `shipping.option` can be set to `selected=true`.
	 * @required
	 */
	selected: boolean

	/**
	 * The method by which the payer wants to get their items.
	 * - SHIPPING - The payer intends to receive the items at a specified address.
	 * - PICKUP - The payer intends to pick up the items at a specified address. For example, a store address.
	 * @optional
	 */
	type?: 'SHIPPING' | 'PICKUP'

	/**
	 * The shipping cost for the selected option.
	 */
	amount?: AmountPrice
}

/**
 * - `INSTANT`: The funds are released to the merchant immediately.
 * - `DELAYED`: The funds are held for a finite number of days.
 * The actual duration depends on the region and type of integration.
 * You can release the funds through a referenced payout.
 * Otherwise, the funds disbursed automatically after the specified duration.
 */
export type DisbursementMode = 'INSTANT' | 'DELAYED'

export interface PlatformFee {
	/**
	 * The fee for this transaction.
	 * @required
	 */
	amount: AmountPrice

	/**
	 * The recipient of the fee for this transaction. If you omit this value, the default is the API caller.
	 * @optional
	 */
	payee?: Payee
}

export interface Payee {
	/**
	 * The email address of merchant.
	 * @optional
	 */
	email_address?: string

	/**
	 * The encrypted PayPal account ID of the merchant.
	 * @optional
	 */
	merchant_id?: string
}

export interface Item {
	/**
	 * The item name or title.
	 * @required
	 */
	name: string

	/**
	 * The item quantity. Must be a whole number.
	 * @required
	 */
	quantity: string

	/**
	 * The detailed item description.
	 * @optional
	 */
	description?: string

	/**
	 * The stock keeping unit (SKU) for the item.
	 * @optional
	 */
	sku?: string

	/**
	 * The item category type.
	 * @optional
	 */
	category?: ItemCategory

	/**
	 * The item price or rate per unit.
	 * If you specify `unit_amount`, `purchase_units[].amount.breakdown.item_total` is required.
	 * Must equal `unit_amount * quantity` for all items. `unit_amount.value` can not be a negative number.
	 * @required
	 */
	unit_amount: AmountPrice

	/**
	 * he item `tax` for each unit.
	 * If tax is specified, `purchase_units[].amount.breakdown.tax_total` is required.
	 * Must equal `tax * quantity` for all items. `tax.value` can not be a negative number.
	 * @optional
	 */
	tax?: AmountPrice
}

/**
 * - `DIGITAL_GOODS`: Goods that are stored, delivered, and used in their electronic format. This value is not currently supported for API callers that leverage the PayPal for Commerce Platform product.
 * - `PHYSICAL_GOODS`: A tangible item that can be shipped with proof of delivery.
 * - `DONATION`: A contribution or gift for which no good or service is exchanged, usually to a not for profit organization.
 */
export type ItemCategory = 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION'
