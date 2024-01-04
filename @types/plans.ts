import type { AmountPrice, Frequency, Link, Taxes } from '.'
import type { PlansQuery as PlansQuerySchema } from '../schemas/Plans'
import type { z } from 'zod'

export interface ListPlansType {
	/**
	 * An array of plans.
	 */
	plans: CreatedPlan[]
	/**
	 * The total number of items.
	 */
	total_items: number
	/**
	 * The total number of pages.
	 */
	total_pages: number
	/**
	 * The HATEOAS links related to this call, including the self link.
	 * @link https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
	 */
	links: Link[]
}

export interface PlanBody {
	/**
	 * The ID of the product created through Catalog Products API.
	 * @required
	 */
	product_id: string
	/**
	 * The plan name.
	 * @required
	 */
	name: string
	/**
	 * The plan status.
	 */
	status?: PlanStatus
	/**
	 * The detailed description of the plan.
	 */
	description?: string
	/**
	 * The detailed description of the plan.
	 * @required
	 */
	billing_cycles: PlanBillingCycle[]
	/**
	 * Indicates whether you can subscribe to this plan by providing a quantity for the goods or service.
	 * @default false
	 */
	quantity_supported?: boolean
	/**
	 * The payment preferences for a subscription.
	 * @required
	 */
	payment_preferences: PaymentPreferences
}

export interface CreatedPlan extends PlanBody {
	/**
	 * The unique PayPal-generated ID for the plan.
	 */
	id: string
	/**
	 * An array of request-related HATEOAS links.
	 * @link https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
	 */
	links: Link[]
	/**
	 * The tax details.
	 */
	taxes: Taxes
	/**
	 * he date and time when the plan was created, in Internet date and time format.
	 * @link https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	create_time: string
	/**
	 * The date and time when the plan was last updated, in Internet date and time format.
	 * @link https://tools.ietf.org/html/rfc3339#section-5.6
	 */
	update_time: string
}

/**
 * CANCEL: Cancels the subscription if the initial payment for the setup fails.
 * CONTINUE: Continues the subscription if the initial payment for the setup fails.
 */
export type SetupFeeFailureAction = 'CANCEL' | 'CONTINUE'

export interface PaymentPreferences {
	/**
	 * Indicates whether to automatically bill the outstanding amount in the next billing cycle.
	 * @default true
	 */
	auto_bill_outstanding?: boolean
	/**
	 * The action to take on the subscription if the initial payment for the setup fails.
	 * @default CANCEL
	 */
	setup_fee_failure_action?: SetupFeeFailureAction
	/**
	 * The maximum number of payment failures before a subscription is suspended.
	 * For example, if payment_failure_threshold is 2, the subscription automatically updates to the SUSPEND state if two consecutive payments fail.
	 * @default 0
	 */
	payment_failure_threshold?: number
	setup_fee?: AmountPrice
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

export type PlansQuery = z.infer<typeof PlansQuerySchema>
