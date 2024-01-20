import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { selectAllOrders, fetchOrders } from "../../redux/features/orders/ordersSlice";
import {TopMenu} from "./TopMenu";
import {InfoNuggets} from "../nuggets/InfoNuggets";
import {ChartsApp} from "../charts/ChartsApp";
import {OrderUtils} from "../../utils/OrderUtils";
import {Panel} from "../../components/Panel";
import {NTERBarChart} from "../charts/NTERBarChart";
import {GameMetricsChart} from "../charts/GameMetricsChart";


const Dashboard = ({onLogin}) => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);

    const orderStatus = useSelector((state) => state.orders.status);
    const error = useSelector((state) => state.orders.error);

    const PanelTabs = [
        {label: 'Revenue', value: 'revenue', defaultActive: true },
        {label: 'Footfall', value: 'footfall', defaultActive: false},
        {label: 'Game Metrics', value: 'game-metrics', defaultActive: false},
    ]
    const [activeTab, setActiveTab] = useState('revenue');

    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrders());
        }
    },[orderStatus, dispatch]);

    const showDashboard = () => {
        if (orderStatus === 'idle') {
            return (
                <div className={'m-10 p-10 bg-amber-400 w-64 justify-items-center items-center rounded-md shadow-md'}>
                    <p className={'text-2xl font-thin text-gray-600 '}>Loading bookings from Server...</p>
                </div>
            )
        }

        if (orderStatus === 'failed') {
            return (
                <div className={'m-10 p-10 bg-red-200 w-64 justify-items-center items-center rounded-md shadow-md'}>
                    <p className={'text-2xl font-thin text-red-600 '}>Error occurred while fetching orders {error}</p>
                </div>
            )
        }
        const chart_orders = OrderUtils.time_series_generator(orders);
        // const unique_games = OrderUtils.unique_name_generator(orders);
        const show_active_chart = () => {
            if (activeTab === 'revenue'){
                return (
                    <NTERBarChart
                        orders={chart_orders}
                        chart_title={'Revenue'}
                        y_axis_title={'$(K)'}
                        fill_colors={["#66DA26"]}
                        aggregator_column={'revenue'}
                        show_revenue={true}
                    />
                );
            }
            if (activeTab === 'footfall'){
                return(
                    <NTERBarChart
                        orders={chart_orders}
                        chart_title={'Footfall'}
                        y_axis_title={'Visitors'}
                        fill_colors={["#FF9800"]}
                        aggregator_column={'guests'}
                        show_revenue={false}
                    />
                );
            }
            if (activeTab === 'game-metrics'){
                return(
                    <GameMetricsChart chart_orders={chart_orders}/>
                )
            }
        }
        return (
            <div className={'p-1 max-w-full max-h-screen border border-gray-100'}>
                <InfoNuggets/>
                <Panel onSelect={setActiveTab} PanelTabs={PanelTabs}>
                    <div className={'w-full h-auto justify-center items-center p-2 '}>
                        {show_active_chart()}
                    </div>
                </Panel>
            </div>
        )

    }
    return (
        <div className={'bg-white m-1 max-h-screen max-w-full overscroll-y-auto'}>
            <TopMenu onLogin={onLogin}/>
            {showDashboard()}
        </div>
    );
}

export {Dashboard}
