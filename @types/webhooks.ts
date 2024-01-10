import type { Address, Link } from '.'

export interface PaypalWebhook {
	id: string
	create_time: string
	resource_type: string
	event_type: PaypalEventType
	summary: string
	resource: {
		billing_agreement_id: string
		agreement_details: {
			outstanding_balance: {
				value: string
			}
			num_cycles_remaining: string
			num_cycles_completed: string
			last_payment_date: string
			last_payment_amount: {
				value: string
			}
			final_payment_due_date: string
			failed_payment_count: string
		}
		description: string
		links: Link[]
		id: string
		shipping_address: ShippingAddress
		plan: {
			curr_code: string
			links: string[]
			payment_definitions: [
				{
					type: string
					frequency: 'Month' | 'Year' | 'Week' | 'Day'
					frequency_interval: string
					amount: {
						value: string
					}
					cycles: string
					charge_models: [
						{
							type: string
							amount: {
								value: string
							}
						},
						{
							type: 'SHIPPING'
							amount: {
								value: string
							}
						}
					]
				}
			]
			merchant_preferences: {
				setup_fee: {
					value: string
				}
				auto_bill_amount: 'YES' | 'NO'
				max_fail_attempts: string
			}
		}
		subscriber: {
			name: {
				given_name: string
				surname: string
			}
			email_address: string
			shipping_address: {
				name: {
					full_name: string
				}
				address: Address
			}
		}
		start_date: string
	}
	links: Link[]
	event_version: string
}

export interface ShippingAddress {
	recipient_name: string
	line1: string
	line2: string
	city: string
	state: string
	postal_code: string
	country_code: string
}

/**
 * https://developer.paypal.com/api/rest/webhooks/event-names/
 */
export type PaypalEventType =
	| 'PAYMENT.AUTHORIZATION.CREATED'
	| 'PAYMENT.AUTHORIZATION.VOIDED'
	| 'PAYMENT.CAPTURE.DECLINED'
	| 'PAYMENT.CAPTURE.COMPLETED'
	| 'PAYMENT.CAPTURE.PENDING'
	| 'PAYMENT.CAPTURE.REFUNDED'
	| 'PAYMENT.CAPTURE.REVERSED'
	| 'PAYMENT.AUTHORIZATION.CREATED'
	| 'PAYMENT.AUTHORIZATION.VOIDED'
	| 'PAYMENT.CAPTURE.COMPLETED'
	| 'PAYMENT.CAPTURE.DENIED'
	| 'PAYMENT.CAPTURE.PENDING'
	| 'PAYMENT.CAPTURE.REFUNDED'
	| 'PAYMENT.CAPTURE.REVERSED'
	| 'PAYMENT.PAYOUTSBATCH.DENIED'
	| 'PAYMENT.PAYOUTSBATCH.PROCESSING'
	| 'PAYMENT.PAYOUTSBATCH.SUCCESS'
	| 'PAYMENT.PAYOUTS-ITEM.BLOCKED'
	| 'PAYMENT.PAYOUTS-ITEM.CANCELED'
	| 'PAYMENT.PAYOUTS-ITEM.DENIED'
	| 'PAYMENT.PAYOUTS-ITEM.FAILED'
	| 'PAYMENT.PAYOUTS-ITEM.HELD'
	| 'PAYMENT.PAYOUTS-ITEM.REFUNDED'
	| 'PAYMENT.PAYOUTS-ITEM.RETURNED'
	| 'PAYMENT.PAYOUTS-ITEM.SUCCEEDED'
	| 'PAYMENT.PAYOUTS-ITEM.UNCLAIMED'
	| 'BILLING.PLAN.CREATED'
	| 'BILLING.PLAN.UPDATED'
	| 'BILLING.SUBSCRIPTION.CANCELLED'
	| 'BILLING.SUBSCRIPTION.CREATED'
	| 'BILLING.SUBSCRIPTION.RE-ACTIVATED'
	| 'BILLING.SUBSCRIPTION.SUSPENDED'
	| 'BILLING.SUBSCRIPTION.UPDATED'
	| 'IDENTITY.AUTHORIZATION-CONSENT.REVOKED'
	| 'PAYMENTS.PAYMENT.CREATED'
	| 'CHECKOUT.ORDER.APPROVED'
	| 'CHECKOUT.CHECKOUT.BUYER-APPROVED'
	| 'CUSTOMER.DISPUTE.CREATED'
	| 'CUSTOMER.DISPUTE.RESOLVED'
	| 'CUSTOMER.DISPUTE.UPDATED'
	| 'RISK.DISPUTE.CREATED'
	| 'INVOICING.INVOICE.CANCELLED'
	| 'INVOICING.INVOICE.CREATED'
	| 'INVOICING.INVOICE.PAID'
	| 'INVOICING.INVOICE.REFUNDED'
	| 'INVOICING.INVOICE.SCHEDULED'
	| 'INVOICING.INVOICE.UPDATED'
	| 'CHECKOUT.ORDER.COMPLETED'
	| 'CHECKOUT.ORDER.APPROVED'
	| 'CHECKOUT.ORDER.PROCESSED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.ADDED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.ESCALATED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.LIFTED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.UPDATED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.CAPABILITY-UPDATED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.PRODUCT-SUBSCRIPTION-UPDATED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.SELLER-ALREADY-INTEGRATED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.SELLER-ONBOARDING-INITIATED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.SELLER-CONSENT-GRANTED'
	| 'CUSTOMER.MERCHANT-INTEGRATION.SELLER-EMAIL-CONFIRMED'
	| 'MERCHANT.ONBOARDING.COMPLETED'
	| 'MERCHANT.PARTNER-CONSENT.REVOKED'
	| 'PAYMENT.CAPTURE.COMPLETED'
	| 'PAYMENT.CAPTURE.DENIED'
	| 'PAYMENT.CAPTURE.REFUNDED'
	| 'PAYMENT.REFERENCED-PAYOUT-ITEM.COMPLETED'
	| 'PAYMENT.REFERENCED-PAYOUT-ITEM.FAILED'
	| 'MERCHANT.ONBOARDING.COMPLETED'
	| 'MERCHANT.PARTNER-CONSENT.REVOKED'
	| 'CUSTOMER.MANAGED-ACCOUNT.ACCOUNT-CREATED'
	| 'CUSTOMER.MANAGED-ACCOUNT.CREATION-FAILED'
	| 'CUSTOMER.MANAGED-ACCOUNT.ACCOUNT-UPDATED'
	| 'CUSTOMER.MANAGED-ACCOUNT.ACCOUNT-STATUS-CHANGED'
	| 'CUSTOMER.MANAGED-ACCOUNT.RISK-ASSESSED'
	| 'CUSTOMER.MANAGED-ACCOUNT.NEGATIVE-BALANCE-NOTIFIED'
	| 'CUSTOMER.MANAGED-ACCOUNT.NEGATIVE-BALANCE-DEBIT-INITIATED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.ADDED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.LIFTED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.UPDATED'
	| 'CUSTOMER.ACCOUNT-LIMITATION.ESCALATED'
	| 'CHECKOUT.ORDER.COMPLETED'
	| 'CHECKOUT.ORDER.APPROVED'
	| 'CHECKOUT.PAYMENT-APPROVAL.REVERSED'
	| 'CHECKOUT.ORDER.PROCESSED'
	| 'PAYMENT.ORDER.CANCELLED'
	| 'PAYMENT.ORDER.CREATED'
	| 'PAYMENT.REFERENCED-PAYOUT-ITEM.COMPLETED'
	| 'PAYMENT.REFERENCED-PAYOUT-ITEM.FAILED'
	| 'PAYMENT.SALE.COMPLETED'
	| 'PAYMENT.SALE.DENIED'
	| 'PAYMENT.SALE.PENDING'
	| 'PAYMENT.SALE.REFUNDED'
	| 'PAYMENT.SALE.REVERSED'
	| 'CATALOG.PRODUCT.CREATED'
	| 'CATALOG.PRODUCT.UPDATED'
	| 'PAYMENT.SALE.COMPLETED'
	| 'PAYMENT.SALE.REFUNDED'
	| 'PAYMENT.SALE.REVERSED'
	| 'BILLING.PLAN.CREATED'
	| 'BILLING.PLAN.UPDATED'
	| 'BILLING.PLAN.ACTIVATED'
	| 'BILLING.PLAN.PRICING-CHANGE.ACTIVATED'
	| 'BILLING.PLAN.DEACTIVATED'
	| 'BILLING.SUBSCRIPTION.CREATED'
	| 'BILLING.SUBSCRIPTION.ACTIVATED'
	| 'BILLING.SUBSCRIPTION.UPDATED'
	| 'BILLING.SUBSCRIPTION.EXPIRED'
	| 'BILLING.SUBSCRIPTION.CANCELLED'
	| 'BILLING.SUBSCRIPTION.SUSPENDED'
	| 'BILLING.SUBSCRIPTION.PAYMENT.FAILED'
	| 'VAULT.CREDIT-CARD.CREATED'
	| 'VAULT.CREDIT-CARD.DELETED'
	| 'VAULT.CREDIT-CARD.UPDATED'

export interface CreatedWebhook {
	/**
	 * The ID of the webhook.
	 * @optional
	 */
	id?: string

	/**
	 * The URL that is configured to listen on localhost for incoming POST notification messages that contain event information.
	 * @required
	 */
	url: string

	/**
	 * An array of events to which to subscribe your webhook.
	 * To subscribe to all events, including events as they are added, specify the asterisk wild card.
	 * To replace the event_types array, specify the asterisk wild card.
	 * To list all supported events, list available events.
	 * @required
	 */
	event_types: { name: PaypalEventType }[]

	/**
	 * An array of request-related HATEOAS links.
	 * @optional
	 */
	links: Link[]
}

export interface WebhookLookup {
	/**
	 * The ID of the webhook lookup.
	 * @optional
	 */
	id?: string

	/**
	 * The application client ID.
	 * @optional
	 */
	client_id?: string

	/**
	 * An array of request-related HATEOAS links.
	 * @optional
	 */
	links?: Link[]
}

export interface VerifySignatureBody {
	/**
	 * The algorithm that PayPal uses to generate the signature and that you can use to verify the signature. Extract this value from the PAYPAL-AUTH-ALGO response header, which is received with the webhook notification.
	 * @required
	 */
	auth_algo: string
	/**
	 * The X.509 public key certificate. Download the certificate from this URL and use it to verify the signature. Extract this value from the PAYPAL-CERT-URL response header, which is received with the webhook notification.
	 * @required
	 */
	cert_url: string

	/**
	 * The ID of the HTTP transmission. Contained in the PAYPAL-TRANSMISSION-ID header of the notification message.
	 * @required
	 */
	transmission_id: string

	/**
	 * The PayPal-generated asymmetric signature. Appears in the PAYPAL-TRANSMISSION-SIG header of the notification message.
	 * @required
	 */
	transmission_sig: string

	/**
	 * The date and time of the HTTP transmission, in Internet date and time format. Appears in the PAYPAL-TRANSMISSION-TIME header of the notification message.
	 * @required
	 */
	transmission_time: string

	/**
	 * The ID of the webhook as configured in your Developer Portal account.
	 * @required
	 */
	webhook_id: string

	/**
	 * A webhook event notification.
	 * @required
	 */
	webhook_event: {
		/**
		 * The event version in the webhook notification.
		 * @optional
		 */
		event_version?: string

		/**
		 * The resource type in the webhook notification.
		 * @optional
		 */
		resource_type?: string
	}
}

export interface VerifySignatureResponse {
	/**
	 * The status of the signature verification.
	 * @required
	 */
	verification_status: 'SUCCESS' | 'FAILURE'
}

export interface EventTypesResponse {
	/**
	 * An array of webhook events.
	 */
	event_types?: EventType[]
}

export interface EventType {
	/**
	 * The unique event name.
	 * Note: To subscribe to all events, including events as they are added, specify an * as the value to represent a wildcard.
	 * @required
	 */
	name: string

	/**
	 * A human-readable description of the event.
	 * @optional
	 */
	description?: string

	/**
	 * The status of a webhook event.
	 * @optional
	 */
	status?: string

	/**
	 * Identifier for the event type example: 1.0/2.0 etc.
	 * @optional
	 */
	resource_versions?: string[]
}

export interface EventNotificationsQuery {
	/**
	 * The number of webhook event notifications to return in the response.
	 * @default `10`
	 * @optional
	 */
	page_size?: number

	/**
	 * Filters the webhook event notifications in the response to those created on or after this date and time and on or before the `end_time` value.
	 * Both values are in Internet date and time format format.
	 * @example `2013-03-06T11:00:00Z`.
	 * @optional
	 */
	start_time?: string

	/**
	 * Filters the webhook event notifications in the response to those created on or after the `start_time` and on or before this date and time.
	 * Both values are in Internet date and time format format.
	 * @example `2013-03-06T11:00:00Z`.
	 */
	end_time?: string

	/**
	 * Filters the response to a single transaction, by ID.
	 */
	transaction_id?: string

	/**
	 * Filters the response to a single event.
	 */
	event_type?: string
}

export interface EventNotificationsResponse {
	/**
	 * An array of webhooks events.
	 * @optional
	 */
	events?: EventNotification[]

	/**
	 * The number of items in each range of results.
	 * Note that the response might have fewer items than the requested `page_size` value.
	 * @optional
	 */
	count?: number

	/**
	 * An array of request-related HATEOAS links.
	 */
	links?: Link[]
}

export interface EventNotification {
	/**
	 * The ID of the webhook event notification.
	 * @optional
	 */
	id?: string

	/**
	 * The date and time when the webhook event notification was created, in Internet date and time format.
	 * @optional
	 */
	create_time?: string

	/**
	 * The name of the resource related to the webhook notification event.
	 * @optional
	 */
	resource_type?: string

	/**
	 * The event version in the webhook notification.
	 * @optional
	 */
	event_version?: string

	/**
	 * The event that triggered the webhook event notification.
	 * @optional
	 */
	event_type?: string

	/**
	 *A summary description for the event notification.
	 * @optional
	 */
	summary?: string

	/**
	 * The resource version in the webhook notification.
	 * @optional
	 */
	resource_version?: string

	/**
	 * The resource that triggered the webhook event notification.
	 * @optional
	 */
	resource?: object

	/**
	 * An array of request-related HATEOAS links.
	 * @optional
	 */
	links?: Link[]
}

export interface SimulateWebhokEventBody {
	/**
	 * The ID of the webhook. If omitted, the URL is required.
	 * @optional
	 */
	webhook_id?: string

	/**
	 * The URL for the webhook endpoint. If omitted, the webhook ID is required.
	 * @optional
	 */
	url?: string

	/**
	 * The event name. Specify one of the subscribed events. For each request, provide only one event.
	 * @required
	 */
	event_type: string

	/**
	 * The identifier for event type ex: 1.0/2.0 etc.
	 * @optional
	 */
	resource_version?: string
}
