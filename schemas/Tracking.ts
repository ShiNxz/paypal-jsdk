import { z } from 'zod'

export const trackerSchema = z.object({
	transaction_id: z.string(),
	tracking_number: z.string().optional(),
	carrier_name_other: z.string().optional(),
	notify_buyer: z.boolean().default(false),
	shipment_direction: z.enum(['FORWARD', 'RETURN']),
	tracking_url: z.string().optional(),
	tracking_number_type: z.enum(['CARRIER_PROVIDED', 'E2E_PARTNER_PROVIDED']).optional(),
	status: z.enum(['CANCELLED', 'DELIVERED', 'LOCAL_PICKUP', 'ON_HOLD', 'SHIPPED']),
	shipment_date: z.string().optional(),
	carrier: z.string().optional(),
	last_updated_time: z.string().optional(),
})

export const trackersSchema = z.array(trackerSchema)
