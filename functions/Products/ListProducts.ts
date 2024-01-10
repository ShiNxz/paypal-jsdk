import type { Response, Query } from '@/@types/products'
import Paypal from '@/utils/Axios'

/**
 * Lists products.
 * @param query The query parameters.
 *
 * @example
 * ```typescript
 * const products = await Products.list({
 * 	page: 1,
 * 	page_size: 1,
 * 	total_required: true,
 * })
 * ```
 */
const ListProducts = async (query?: Query): Promise<Response> => {
	try {
		const { data } = await Paypal.get<Response>(`/catalogs/products`, {
			params: query,
		})

		return data
	} catch (error) {
		throw error
	}
}

export default ListProducts
