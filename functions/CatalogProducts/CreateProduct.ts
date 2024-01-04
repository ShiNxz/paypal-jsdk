import type { Example } from '@/@types'
import type { Product, ProductResponse } from '@/@types/products'
import { productSchema } from '@/schemas/Products'
import Paypal from '@/utils/Axios'

/**
 * Creates a product.
 */
const CreateProduct = async (options: Product): Promise<ProductResponse> => {
	try {
		const product = productSchema.parse(options)
		const { data } = await Paypal.post<ProductResponse>(`/catalogs/products`, product)

		return data
	} catch (error) {
		throw error
	}
}

export const description = 'Creates a product with the given options.'

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

export default CreateProduct
