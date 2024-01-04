import type { Method } from 'axios'

export * from './payments'
export * from './plans'
export * from './products'
export * from './subscriptions'
export * from './tracking'
export * from './webhooks'

export interface Frequency {
	/**
	 * The interval at which the subscription is charged or billed.
	 */
	interval_unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

	/**
	 * The number of intervals after which a subscriber is billed.
	 * For example, if the interval_unit is DAY with an interval_count of 2, the subscription is billed once every two days.
	 * The following table lists the maximum allowed values for the interval_count for each interval_unit:
	 * - Interval unit | Maximum interval count:
	 * - DAY 365
	 * - WEEK 52
	 * - MONTH 12
	 * - YEAR 1
	 * @default 1
	 */
	interval_count?: number
}

export interface AmountPrice {
	/**
	 * The three-character ISO-4217 currency code that identifies the currency.
	 * https://developer.paypal.com/docs/integration/direct/rest/currency-codes/
	 * @required
	 * @length 3
	 * @pattern [A-Z]{3}
	 * @example USD
	 */
	currency_code: string
	/**
	 * The value, which might be:
	 * An integer for currencies like JPY that are not typically fractional.
	 * A decimal fraction for currencies like TND that are subdivided into thousandths.
	 * For the required number of decimal places for a currency code, see Currency Codes.
	 */
	value: string
}

export interface Example {
	description: string
	code: string
}

export interface Link {
	/**
	 * The complete target URL.
	 * To make the related call, combine the method with this URI Template-formatted link.
	 * For pre-processing, include the $, (, and ) characters.
	 * The href is the key HATEOAS component that links a completed call with a subsequent call.
	 * @link https://tools.ietf.org/html/rfc6570
	 */
	href: string
	/**
	 * The link relation type, which serves as an ID for a link that unambiguously describes the semantics of the link. See Link Relations.
	 * @link https://tools.ietf.org/html/rfc5988#section-4
	 * @link https://www.iana.org/assignments/link-relations/link-relations.xhtml
	 */
	rel: string
	/**
	 * The HTTP method required to make the related call.
	 */
	method?: Method
}

export interface Taxes {
	/**
	 * Indicates whether the tax was already included in the billing amount.
	 * @default true
	 */
	inclusive?: boolean
	/**
	 * The tax percentage on the billing amount.
	 * @required
	 */
	percentage: string
}

export interface Address {
	/**
	 * The first line of the address.
	 * For example, number or street. For example, 173 Drury Lane.
	 * Required for data entry and compliance and risk checks.
	 * Must contain the full address.
	 */
	address_line_1?: string
	/**
	 * The second line of the address.
	 * For example, suite or apartment number.
	 */
	address_line_2?: string
	/**
	 * A city, town, or village.
	 * Smaller than admin_area_level_1.
	 */
	admin_area_2?: string
	/**
	 * The highest level sub-division in a country, which is usually a province, state, or ISO-3166-2 subdivision.
	 * Format for postal delivery.
	 * For example, CA and not California. Value, by country, is:
	 * - UK. A county.
	 * - US. A state.
	 * - Canada. A province.
	 * - Japan. A prefecture.
	 * - Switzerland. A kanton.
	 */
	admin_area_1?: string
	/**
	 * The postal code, which is the zip code or equivalent.
	 * Typically required for countries with a postal code or an equivalent.
	 * See postal code.
	 * @see https://en.wikipedia.org/wiki/Postal_code
	 */
	postal_code?: string
	/**
	 * The two-character ISO 3166-1 code that identifies the country or region.
	 * Note: The country code for Great Britain is GB and not UK as used in the top-level domain names for that country.
	 * Use the C2 country code for China worldwide for comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
	 * @see https://developer.paypal.com/docs/integration/direct/rest/country-codes/
	 */
	country_code?: string
}
