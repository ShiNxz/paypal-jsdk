import type { ListPlans as ListPlansType, PlansQuery as PlansQueryType } from '../types/Plans'
import type { Example } from '../types/General'
import { PlansQuery } from '../schemas/Plans'
import Paypal from '../utils/Axios'

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

export const description = 'Lists billing plans.'

export const examples: Example[] = [
	{
		description: 'List all plans',
		code: `ListPlans({
			page_size: 10,
			page: 1,
			total_required: true,
		})`,
	},
]

export default ListPlans
