import { z } from 'zod'

export const PlanStatus = z.enum(['CREATED', 'INACTIVE', 'ACTIVE'])

export const Frequency = z.object({
	interval_unit: z.enum(['DAY', 'WEEK', 'MONTH', 'YEAR']),
	interval_count: z.number().optional().default(1),
})

export const AmountPrice = z.object({
	currency_code: z
		.string()
		.length(3)
		.regex(/[A-Z]{3}/),
	value: z.string(),
})

export const PricingSchemeTier = z.object({
	starting_quantity: z.string(),
	ending_quantity: z.string().optional(),
	price: AmountPrice,
})

export const PricingSchemeModel = z.enum(['VOLUME', 'TIERED'])

export const PricingScheme = z.object({
	pricing_model: PricingSchemeModel.optional(),
	tiers: z.array(PricingSchemeTier).optional(),
	fixed_price: AmountPrice.optional(),
})

export const PlanBillingCycle = z.object({
	tenure_type: z.enum(['REGULAR', 'TRIAL']),
	sequence: z.number(),
	total_cycles: z.number().optional().default(0),
	pricing_scheme: PricingScheme.optional(),
	frequency: Frequency,
})

export const SetupFeeFailureAction = z.enum(['CANCEL', 'CONTINUE'])

export const PaymentPreferences = z.object({
	auto_bill_outstanding: z.boolean().optional().default(true),
	setup_fee_failure_action: SetupFeeFailureAction.optional(),
	payment_failure_threshold: z.number().default(0).optional(),
	setup_fee: AmountPrice.optional(),
})

export const PlanBody = z.object({
	product_id: z.string(),
	name: z.string(),
	status: PlanStatus.optional(),
	description: z.string().optional(),
	billing_cycles: z.array(PlanBillingCycle),
	quantity_supported: z.boolean().optional().default(false),
	payment_preferences: PaymentPreferences.optional(),
})

export const PlansQuery = z
	.object({
		product_id: z.string().min(6).max(50).optional(),
		plan_ids: z.string().min(3).max(270).optional(),
		page_size: z.number().optional(),
		page: z.number().optional(),
		total_required: z.boolean().optional(),
	})
	.optional()
