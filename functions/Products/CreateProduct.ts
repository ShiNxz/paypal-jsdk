import type { Product, ProductResponse } from '@/@types/products'
import { productSchema } from '@/schemas/Products'
import Paypal from '@/utils/Axios'

/**
 * Creates a product.
 * @param options The request body.
 *
 * @example
 * ```typescript
 * const product = await Products.create({
 * 	id: '123456789',
 * 	name: 'Test Product',
 * 	type: 'DIGITAL',
 * })
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

export default CreateProduct
