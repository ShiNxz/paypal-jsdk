import type { ProductResponse } from '@/@types/products'
import Paypal from '@/utils/Axios'

/**
 * Shows details for a product, by ID.
 * @param productId The ID of the product to show details for.
 * 
 * @example
 * ```typescript
 * const product = await Products.details('P-XXX')
 * ```
 */
const ShowProductDetails = async (productId: string): Promise<ProductResponse> => {
	try {
		const { data } = await Paypal.get<ProductResponse>(`/catalogs/products/${productId}`)

		return data
	} catch (error) {
		throw error
	}
}

export default ShowProductDetails
