import React from "react";
import {NTERBarChart} from "./NTERBarChart";
import {GameMetricsChart} from "./GameMetricsChart";

export const ChartsApp = ({orders}) => {
    return (
        <div className={'w-full flex-col'}>
            <div className={'w-full mx-1 my-2 p-1 flex'}>
                <NTERBarChart
                    orders={orders}
                    chart_title={'Revenue'}
                    y_axis_title={'$(K)'}
                    fill_colors={["#66DA26"]}
                    aggregator_column={'revenue'}
                    show_revenue={true}
                />
                <NTERBarChart
                    orders={orders}
                    chart_title={'Footfall'}
                    y_axis_title={'Visitors'}
                    fill_colors={["#FF9800"]}
                    aggregator_column={'guests'}
                    show_revenue={false}
                />
            </div>
            <GameMetricsChart chart_orders={orders}/>
        </div>
    )
}
