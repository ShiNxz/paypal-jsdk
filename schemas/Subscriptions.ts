import { AmountPrice, PaymentPreferences, PlanBillingCycle } from './Plans'
import { z } from 'zod'

const Name = z.object({
	given_name: z.string().optional(),
	surname: z.string().optional(),
})

const Address = z.object({
	address_line_1: z.string().optional(),
	address_line_2: z.string().optional(),
	admin_area_2: z.string().optional(),
	admin_area_1: z.string().optional(),
	postal_code: z.string().optional(),
	country_code: z.string().optional(),
})

const Card = z.object({
	name: z.string().optional(),
	number: z.string(),
	security_code: z.string().optional(),
	expiry: z.string(),
	billing_address: Address.optional(),
})

const Taxes = z.object({
	inclusive: z.boolean().optional().default(true),
	percentage: z.string(),
})

export const CreateSubscriptionBody = z.object({
	quantity: z.string().optional(),
	auto_renewal: z.boolean().optional(),
	custom_id: z.string().optional(),
	start_time: z.string().optional(),
	shipping_amount: AmountPrice.optional(),
	subscriber: z
		.object({
			email_address: z.string().optional(),
			name: Name.optional(),
		})
		.optional(),
	phone: z
		.object({
			phone_type: z.enum(['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER']).optional(),
			phone_number: z.object({
				national_number: z.string(),
			}),
		})
		.optional(),
	shipping_address: z
		.object({
			type: z.enum(['SHIPPING', 'PICKUP_IN_PERSON']).optional(),
			name: Name.optional(),
			address: Address.optional(),
			payment_source: z
				.object({
					card: Card.optional(),
				})
				.optional(),
		})
		.optional(),
	application_context: z
		.object({
			brand_name: z.string().optional(),
			shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).optional(),
			user_action: z.enum(['CONTINUE', 'SUBSCRIBE_NOW']).optional(),
			return_url: z.string(),
			cancel_url: z.string(),
			locale: z.string().optional(),
			payment_method: z
				.object({
					payer_selected: z.string().optional(),
					payee_preferred: z.enum(['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED']).optional(),
				})
				.optional(),
		})
		.optional(),
	plan: z
		.object({
			billing_cycles: PlanBillingCycle,
			payment_preferences: PaymentPreferences,
			taxes: Taxes,
		})
		.optional(),
})

export const CapturePaymentBody = z.object({
	notes: z.string(),
	capture_type: z.literal('OUTSTANDING_BALANCE'),
	amount: AmountPrice,
})
