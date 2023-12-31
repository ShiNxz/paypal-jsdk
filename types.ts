import type { Method } from 'axios'

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
		links: [
			{
				href: string
				rel: string
				method: Method
			}
		]
		id: string
		shipping_address: {
			recipient_name: string
			line1: string
			line2: string
			city: string
			state: string
			postal_code: string
			country_code: string
		}
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
				address: {
					address_line_1: string
					address_line_2: string
					admin_area_2: string
					admin_area_1: string
					postal_code: string
					country_code: string
				}
			}
		}
		start_date: string
	}
	links: [
		{
			href: string
			rel: string
			method: Method
			encType: string
		}
	]
	event_version: string
}

export enum PlanStatus {
	/**
	 * The plan was created. You cannot create subscriptions for a plan in this state.
	 */
	'CREATED' = 'CREATED',
	/**
	 * The plan is inactive.
	 */
	'INACTIVE' = 'INACTIVE',
	/**
	 * The plan is active. You can only create subscriptions for a plan in this state.
	 */
	'ACTIVE' = 'ACTIVE',
}

export interface PlanBillingCycle {
	/**
	 * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles are allowed per plan.
	 */
	tenure_type: 'REGULAR' | 'TRIAL'
	/**
	 * The order in which this cycle is to run among other billing cycles.
	 * For example, a trial billing cycle has a sequence of 1 while a regular billing cycle has a sequence of 2, so that trial cycle runs before the regular cycle.
	 */
	sequence: number
	/**
	 * The number of times this billing cycle gets executed.
	 * Trial billing cycles can only be executed a finite number of times (value between 1 and 999 for total_cycles).
	 * Regular billing cycles can be executed infinite times (value of 0 for total_cycles) or a finite number of times (value between 1 and 999 for total_cycles).
	 * @default 0
	 */
	total_cycles?: number
	/**
	 * The active pricing scheme for this billing cycle. A free trial billing cycle does not require a pricing scheme.
	 */
	pricing_scheme?: PricingScheme
	/**
	 * The frequency details for this billing cycle.
	 */
	frequency: Frequency
}

export interface Frequency {
	/**
	 * The interval at which the subscription is charged or billed.
	 */
	interval_unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

	/**
	 * The number of intervals after which a subscriber is billed.
	 * For example, if the interval_unit is DAY with an interval_count of 2, the subscription is billed once every two days.
	 * The following table lists the maximum allowed values for the interval_count for each interval_unit:
	 * - Interval unit | Maximum interval count:
	 * - DAY 365
	 * - WEEK 52
	 * - MONTH 12
	 * - YEAR 1
	 * @default 1
	 */
	interval_count?: number
}

export interface PricingScheme {
	/**
	 * The pricing model for tiered plan. The tiers parameter is required.
	 */
	pricing_model?: PricingSchemeModel
	/**
	 * An array of pricing tiers which are used for billing volume/tiered plans. pricing_model field has to be specified.
	 */
	tiers?: PricingSchemeTier[]
	/**
	 * The fixed amount to charge for the subscription.
	 * The changes to fixed amount are applicable to both existing and future subscriptions.
	 * For existing subscriptions, payments within 10 days of price change are not affected.
	 */
	fixed_price?: AmountPrice
}

export enum PricingSchemeModel {
	/**
	 * A volume pricing model.
	 */
	'VOLUME' = 'VOLUME',
	/**
	 * A tiered pricing model.
	 */
	'TIERED' = 'TIERED',
}

export interface PricingSchemeTier {
	/**
	 * The starting quantity for the tier.
	 * @required
	 */
	starting_quantity: string
	/**
	 * The ending quantity for the tier. Optional for the last tier.
	 */
	ending_quantity?: string
	/**
	 * The pricing amount for the tier.
	 * @required
	 */
	price: AmountPrice
}

export interface AmountPrice {
	/**
	 * The three-character ISO-4217 currency code that identifies the currency.
	 * https://developer.paypal.com/docs/integration/direct/rest/currency-codes/
	 * @required
	 * @length 3
	 * @pattern [A-Z]{3}
	 * @example USD
	 */
	currency_code: string
	/**
	 * The value, which might be:
	 * An integer for currencies like JPY that are not typically fractional.
	 * A decimal fraction for currencies like TND that are subdivided into thousandths.
	 * For the required number of decimal places for a currency code, see Currency Codes.
	 */
	value: string
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
