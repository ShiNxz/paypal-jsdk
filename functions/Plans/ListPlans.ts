import type { ListPlansType, PlansQuery as PlansQueryType } from '@/@types/plans'
import type { Example } from '@/@types'
import { PlansQuery } from '@/schemas/Plans'
import Paypal from '@/utils/Axios'

/**
 * Lists billing plans.
 */
const ListPlans = async (query?: PlansQueryType): Promise<ListPlansType> => {
	try {
		const params = PlansQuery.parse(query)

		const { data } = await Paypal.get<ListPlansType>(`/billing/plans`, {
			params,
		})

		return data
	} catch (error) {
		throw error
	}
}

const description = 'Lists billing plans.'

const examples: Example[] = [
	{
		description: 'List all plans',
		code: `const products = await ListProducts({ page: 1, page_size: 1, total_required: true })`,
	},
]

export default ListPlans
