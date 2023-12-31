import type { Example } from '../types/General'
import type { ListParams, ListResponse } from '../types/Subscriptions'
import Paypal from '../utils/Axios'

/**
 * Lists transactions for a subscription.
 * @param subId The ID of the subscription.
 * @param params query parameters
 **/
const ListTransactions = async (subId: string, params: ListParams): Promise<ListResponse> => {
	try {
		const res = await Paypal.get<ListResponse>(`/billing/subscriptions/${subId}/transactions`, {
			params,
		})

		return res.data
	} catch (error) {
		throw error
	}
}

export const description = 'Lists transactions for a subscription.'

export const examples: Example[] = [
	{
		description: 'Lists transactions for a subscription.',
		code: `await ListTransactions('I-K8P5B0NSA6N6', {
			start_time: '2021-09-01T00:00:00Z',
			end_time: '2021-09-30T00:00:00Z',
		})`,
	},
]

export default ListTransactions
