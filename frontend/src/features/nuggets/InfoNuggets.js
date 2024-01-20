import React from "react";
import {useSelector} from "react-redux";
import {selectAllOrders} from "../../redux/features/orders/ordersSlice";
import {Nugget} from "./Nugget";
import {computeInfoStatus} from "./Stats";
import accounting from "accounting-js";


const InfoNuggets = () => {
    const orders = useSelector(selectAllOrders)
    const orderStatus = useSelector((state) => state.orders.status);

    if (orderStatus === 'succeeded') {
        let stats = computeInfoStatus(orders);
        let visit_pct = stats.current_stats.visits /stats.prev_stats.visits - 1 ;
        let revenue_pct =stats.current_stats.revenue /stats.prev_stats.revenue - 1 ;
        let ytd_visit_pct = stats.ytd_current_stats.visits /stats.ytd_prev_stats.visits - 1 ;
        let ytd_revenue_pct =stats.ytd_current_stats.revenue /stats.ytd_prev_stats.revenue - 1 ;

        return (
            <div className={'w-full h-auto my-1 p-1 flex justify-evenly'}>
                <Nugget icon_name={'group'}
                        text={'Monthly Visits'}
                        stats={stats.current_stats.visits}
                        percent={visit_pct}
                        prev_stat={stats.prev_stats.visits}
                        icon_color={'text-indigo-600'}/>

                <Nugget icon_name={'shopping_cart'}
                        stats={`${accounting.formatMoney(stats.current_stats.revenue)} `}
                        text={'Monthly Revenue'}
                        percent={revenue_pct}
                        prev_stat={`${accounting.formatMoney(stats.prev_stats.revenue)}`}
                        icon_color={'text-orange-600'}/>

                <Nugget icon_name={'group'}
                        text={'YTD Visits'}
                        stats={stats.ytd_current_stats.visits}
                        percent={ytd_visit_pct}
                        prev_stat={stats.ytd_prev_stats.visits}
                        icon_color={'text-indigo-600'}/>

                <Nugget icon_name={'shopping_cart'}
                        stats={`${accounting.formatMoney(stats.ytd_current_stats.revenue)} `}
                        text={'YTD Revenue'}
                        percent={ytd_revenue_pct}
                        prev_stat={`${accounting.formatMoney(stats.ytd_prev_stats.revenue)}`}
                        icon_color={'text-orange-600'}/>
            </div>
        )
    } else {
        return (
            <div className={'w-full h-auto my-4 p-4 flex bg-amber-100 border border-gray-100'}>
                <p className={'text-gray-700 text-2xl text-center font-thin'}>
                    Working on generating information nuggets.. Please wait.
                </p>
            </div>
        )
    }
}

export {InfoNuggets}
