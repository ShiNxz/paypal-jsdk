import type { Example } from '@/@types'
import type { Response, Query } from '@/@types/products'
import Paypal from '@/utils/Axios'

/**
 * Lists products.
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

export const description = 'Lists products with the given query'

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

export default ListProducts
