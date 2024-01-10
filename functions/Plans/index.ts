import ActivatePlan from './ActivatePlan'
import CreatePlan from './CreatePlan'
import DeactivatePlan from './DeactivatePlan'
import ListPlans from './ListPlans'
import PlanDetails from './PlanDetails'
import UpdatePlanPricing from './UpdatePlanPricing'

export { ActivatePlan, CreatePlan, DeactivatePlan, ListPlans, PlanDetails, UpdatePlanPricing }

export default {
	activate: ActivatePlan,
	create: CreatePlan,
	deactivate: DeactivatePlan,
	list: ListPlans,
	details: PlanDetails,
	updatePricing: UpdatePlanPricing,
}
