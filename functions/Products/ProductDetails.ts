import type { Example } from '@/@types'
import type { ProductResponse } from '@/@types/products'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a product, by ID.
 */
const ShowProductDetails = async (productId: string): Promise<ProductResponse> => {
	try {
		const { data } = await Paypal.get<ProductResponse>(`/catalogs/products/${productId}`)

		return data
	} catch (error) {
		throw error
	}
}

export const description = 'Shows details for a product, by ID.'

export const examples: Example[] = [
	{
		description: '',
		code: `const product = await CreateProduct({
			id: '123456789',
			name: 'Test Product',
			type: 'DIGITAL',
		})`,
	},
]

export default ShowProductDetails
