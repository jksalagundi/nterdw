/**
 * Compute Nugget Stats and send them back as
 * {
 *    'visits',
 *    'revenue',
 *    'capacity',
 *    'popularity',
 * }
 * @param orders
 * @param filters
 */
import _ from "lodash";

const STATS = {
    visits: 0,
    revenue: 0.0,
    capacity: 0.0,
    popularity: 'Some Game'
}

export const computeInfoStatus = (orders, filters = null) => {
    let current_stats = _.cloneDeep(STATS), prev_stats = _.cloneDeep(STATS);
    let ytd_current_stats = _.cloneDeep(STATS), ytd_prev_stats = _.cloneDeep(STATS);

    const today = new Date();
    const thirtyDaysPrior = (new Date()).setDate(today.getDate() - 30);
    const oneYearPriorD1 = (new Date()).setDate(today.getDate() - (30 + 365));
    const oneYearPriorD2 = (new Date()).setDate(today.getDate() - (365));
    let thirty_days_filtered_orders, previous_year_rolling_thirty_days_orders;
    let ytd_filtered_orders, prev_ytd_filtered_orders;
    if (orders) {
        thirty_days_filtered_orders = orders.filter((order) => {
            return order.arrival_dt >= thirtyDaysPrior && order.arrival_dt <= today
        });

        previous_year_rolling_thirty_days_orders = orders.filter((order) => {
            return order.arrival_dt >= oneYearPriorD1 && order.arrival_dt <= oneYearPriorD2
        });

        ytd_filtered_orders = orders.filter((order) => {
            return order.arrival_dt.getFullYear() === today.getFullYear() && order.arrival_dt <= today
        });

        const one_year_prior_start = new Date(today.getFullYear() - 1, 0, 1)
        prev_ytd_filtered_orders = orders.filter((order) => {

            /*return (order.arrival_dt.getFullYear() === today.getFullYear() - 1) &&
                (order.arrival_dt.getMonth() <= today.getMonth())*/
            return (order.arrival_dt >= one_year_prior_start && order.arrival_dt <= oneYearPriorD2)
        });
        current_stats.visits = _.sumBy(thirty_days_filtered_orders, 'guests');
        current_stats.revenue = _.sumBy(thirty_days_filtered_orders, 'revenue');

        prev_stats.visits = _.sumBy(previous_year_rolling_thirty_days_orders, 'guests');
        prev_stats.revenue = _.sumBy(previous_year_rolling_thirty_days_orders, 'revenue');

        ytd_current_stats.visits = _.sumBy(ytd_filtered_orders, 'guests');
        ytd_current_stats.revenue = _.sumBy(ytd_filtered_orders, 'revenue');

        ytd_prev_stats.visits = _.sumBy(prev_ytd_filtered_orders, 'guests');
        ytd_prev_stats.revenue = _.sumBy(prev_ytd_filtered_orders, 'revenue');

    }
    console.log(current_stats, prev_stats, ytd_current_stats, ytd_prev_stats);
    return {current_stats, prev_stats, ytd_current_stats, ytd_prev_stats};
}
