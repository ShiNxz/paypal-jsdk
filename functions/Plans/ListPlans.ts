import type { ListPlansType, PlansQuery as PlansQueryType } from '@/@types/plans'
import { PlansQuery } from '@/schemas/Plans'
import Paypal from '@/utils/Axios'

/**
 * Lists billing plans.
 * @param query The query parameters.
 *
 * @example
 * ```typescript
 * 		const plans = await Plans.list({
 * 			page: 1,
 * 			page_size: 1,
 * 			total_required: true,
 * 		})
 * ```
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

export default ListPlans
