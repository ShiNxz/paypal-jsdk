import type { Link, Taxes } from './General'
import type { AmountPrice, PlanBillingCycle, PlanStatus } from '../types'
import { z } from 'zod'
import { PlansQuery as PlansQuerySchema } from '../schemas/Plans'

export interface ListPlans {
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

export type PlansQuery = z.infer<typeof PlansQuerySchema>
