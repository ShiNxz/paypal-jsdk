import { z } from 'zod'

export const productSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	description: z.string().optional(),
	type: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE']),
	category: z.string().optional(),
	image_url: z.string().optional(),
	home_url: z.string().optional(),
})
