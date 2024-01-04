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

export enum PaypalEventType {
	'BILLING.SUBSCRIPTION.CREATED' = 'BILLING.SUBSCRIPTION.CREATED',
	'BILLING.SUBSCRIPTION.ACTIVATED' = 'BILLING.SUBSCRIPTION.ACTIVATED',
	'BILLING.SUBSCRIPTION.RE-ACTIVATED' = 'BILLING.SUBSCRIPTION.RE-ACTIVATED',
	'BILLING.SUBSCRIPTION.UPDATED' = 'BILLING.SUBSCRIPTION.UPDATED',
	'BILLING.SUBSCRIPTION.EXPIRED' = 'BILLING.SUBSCRIPTION.EXPIRED',
	'BILLING.SUBSCRIPTION.CANCELLED' = 'BILLING.SUBSCRIPTION.CANCELLED',
	'BILLING.SUBSCRIPTION.SUSPENDED' = 'BILLING.SUBSCRIPTION.SUSPENDED',
	'BILLING.SUBSCRIPTION.PAYMENT.FAILED' = 'BILLING.SUBSCRIPTION.PAYMENT.FAILED',
	'PAYMENT.SALE.COMPLETED' = 'PAYMENT.SALE.COMPLETED',
}
