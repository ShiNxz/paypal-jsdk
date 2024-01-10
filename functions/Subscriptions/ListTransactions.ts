import type { ListParams, ListResponse } from '@/@types/subscriptions'
import Paypal from '@/utils/Axios'

/**
 * Lists transactions for a subscription.
 * @param subId The ID of the subscription.
 * @param params query parameters
 *
 * @example
 * ```typescript
 * await Subscriptions.listTransactions('I-K8P5B0NSA6N6', {
 * 	start_time: '2021-09-01T00:00:00Z',
 * 	end_time: '2021-09-30T00:00:00Z',
 * })
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

export default ListTransactions
