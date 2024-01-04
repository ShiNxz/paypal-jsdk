export interface Tracker {
	/**
	 * The PayPal transaction ID.
	 * @required
	 */
	transaction_id: string

	/**
	 * The tracking number for the shipment.
	 * @optional
	 */
	tracking_number?: string

	/**
	 * The name of the carrier for the shipment. Provide this value only if the carrier parameter is OTHER.
	 * @optional
	 */
	carrier_name_other?: string

	/**
	 * If true , sends an email notification to the buyer of the PayPal transaction. The email contains the tracking information that was uploaded through the API.
	 * @optional
	 * @default false
	 */
	notify_buyer: boolean

	/**
	 * To denote whether the shipment is sent forward to the receiver or returned back.
	 * @optional
	 */
	shipment_direction: ShipmentDirection

	/**
	 * Tracking Link of the shipment.
	 * @optional
	 */
	tracking_url?: string

	/**
	 * The type of tracking number.
	 * @optional
	 */
	tracking_number_type?: TrackingNumberType

	/**
	 * The status of the item shipment.
	 * For allowed values, see [Shipping Statuses](https://developer.paypal.com/docs/tracking/reference/shipping-status/).
	 * @required
	 */
	status: TrackingStatus

	/**
	 * The stand-alone date, in Internet date and time format.
	 * To represent special legal values, such as a date of birth, you should use dates with no associated time or time-zone data.
	 * Whenever possible, use the standard date_time type.
	 * This regular expression does not validate all dates.
	 * For example, February 31 is valid and nothing is known about leap years.
	 * @optional
	 */
	shipment_date?: string

	/**
	 * The carrier for the shipment.
	 * Some carriers have a global version as well as local subsidiaries.
	 * The subsidiaries are repeated over many countries and might also have an entry in the global list.
	 * Choose the carrier for your country.
	 * If the carrier is not available for your country, choose the global version of the carrier.
	 * If your carrier name is not in the list, set `carrier` to `OTHER` and set carrier name in `carrier_name_other`.
	 * For allowed values, see [Carriers](https://developer.paypal.com/docs/tracking/reference/carriers/).
	 * @optional
	 */
	carrier?: string

	/**
	 * The date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 * Seconds are required while fractional seconds are optional.
	 */
	last_updated_time?: string
}

/**
 * - FORWARD The shipment is sent forward to the receiver.
 * - RETURN The shipment was returned back.
 */
export type ShipmentDirection = 'FORWARD' | 'RETURN'

/**
 * - CARRIER_PROVIDED A merchant-provided tracking number.
 * - E2E_PARTNER_PROVIDED A marketplace-provided tracking number.
 */
export type TrackingNumberType = 'CARRIER_PROVIDED' | 'E2E_PARTNER_PROVIDED'

/**
 * - CANCELLED The shipment was cancelled and the tracking number no longer applies.
 * - DELIVERED The item was already delivered when the tracking number was uploaded.
 * - LOCAL_PICKUP Either the buyer physically picked up the item or the seller delivered the item in person without involving any couriers or postal companies.
 * - ON_HOLD The item is on hold. Its shipment was temporarily stopped due to bad weather, a strike, customs, or another reason.
 * - SHIPPED The item was shipped and is on the way.
 */
export type TrackingStatus = 'CANCELLED' | 'DELIVERED' | 'LOCAL_PICKUP' | 'ON_HOLD' | 'SHIPPED'
