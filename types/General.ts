import type { Method } from 'axios'

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
