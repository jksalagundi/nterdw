import _ from "lodash";

/**
 * Returns time series collections, using lodash functions
 * @param orders
 */
const __generate_time_series_collection = (orders) => {
    return {
        ts_month: _.groupBy(orders, 'arrival_month_number'),
        ts_qtr: _.groupBy(orders, 'arrival_qtr_year'),
        ts_year: _.groupBy(orders, 'arrival_year'),
    }

}

const __generate_unique_game_names = (orders) =>{
    return _.uniqBy(orders, 'game')
}

export const OrderUtils = {
    time_series_generator : __generate_time_series_collection,
    unique_name_generator : __generate_unique_game_names,
}
