import React, {useState} from "react";
import Chart from "react-apexcharts";
import _ from "lodash";
import {TimeSeriesUtils} from "../../utils/TimeSeriesUtils";
import {get_chart_options} from "../../utils/ApexChartOptions";
import {HorizontalRadioSelect} from "../../components/HorizontalRadioSelect";
import {MultipleGameSelect} from "../../components/MultipleGameSelect";
import {useSelector} from "react-redux";
import {selectAllOrders} from "../../redux/features/orders/ordersSlice";
import {OrderUtils} from "../../utils/OrderUtils";

const GameMetricsChart = ({chart_orders}) => {
    const [timeSeries, setTimeSeries] = useState('month');
    const [location, setLocation] = useState('all')
    const [metric, setMetric] = useState('revenue')
    const [game, setGame] = useState('all');
    const [selectedGames, setSelectedGames] = useState(null);
    const Colors = ["#FF1744","#FFD600","#00BFA5","#E65100", "#304FFE","#00C853",  "#2979FF", "#00B8D4", "#AEEA00", ""]
    let orders = useSelector(selectAllOrders);

    const TimeSeriesSelectOptions = [
        {label: 'Month', value: 'month'},
        {label: 'Qtr', value: 'qtr'},
        {label: 'Year', value: 'year'},
    ];
    const locationOptions = [
        {label: 'All', value: 'all'},
        {label: 'McKinney', value: 'mckinney'},
        {label: 'Plano', value: 'plano'},
    ];

    const metricsOptions = [
        {label: 'Revenue', value: 'revenue'},
        {label: 'Footfall', value: 'footfall'},
        {label: 'Profit', value: 'profit'},
    ];

    const gameOptions = [
        {label: 'All Games', value: 'all'},
        {label: 'Select Games', value: 'select'}
    ];

    let Series = [
        {name: "Footfall Chart", data: []}
    ];

    const filterBySelectedGames = () => {
        return _.filter(orders, (order) => {
            /** {label, value, selected} **/
            let selectedFlag = false;
            if (selectedGames) {
                selectedGames.forEach((sg) => {
                    if (!selectedFlag && sg.value === order.game && sg.selected) {
                        selectedFlag = true
                    }
                })
            }
            return selectedFlag;
        })
    }
    let options = _.cloneDeep(get_chart_options("Visitors", Colors, (metric !== 'footfall')));
    let series = _.cloneDeep(Series);

    const grouped_orders = (selectedGames) ? OrderUtils.time_series_generator(filterBySelectedGames()) : chart_orders;

    const filter_by_location_game = (orders, game=null) => {
        switch (location) {
            case 'plano':
                if (game)
                    return _.filter(orders, {'location': 'Plano', 'game': game})
                else
                    return _.filter(orders, {'location': 'Plano'})
            case 'mckinney':
                if (game)
                    return _.filter(orders, {'location': 'McKinney', 'game': game})
                else
                    return _.filter(orders, {'location': 'McKinney'})
            default:
                if (game)
                    return _.filter(orders, {'game': game})
                else
                    return orders;
        }
    }
    let chart_title = `${metric} for ${location} location(s)`;
    let title;

    const generate_data_for_charts = () => {
        options = _.cloneDeep(get_chart_options((metric !== 'footfall') ? "Revenue" : "Visitors",
            Colors, (metric !== 'footfall')));
        series = _.cloneDeep(Series);
        if (grouped_orders && !_.isEmpty(grouped_orders.ts_month)) {
            options.xaxis.categories = TimeSeriesUtils.generate_time_series_labels(timeSeries, 15);
            const display_money = (metric !== 'footfall');
            const divider = (display_money) ? 1000 : 1;
            /** TODO ** Profit needs to be handled as an aggregator column **/
            const aggregator_column = (metric === 'revenue') ? 'revenue' : (metric === 'footfall') ? 'guests' : 'revenue';

            let chartData;
            if (selectedGames) {
                series = [];
                selectedGames.forEach((sg) => {
                    if (sg.selected) {
                        console.log("Single Selected Game ", sg);
                        chartData = options.xaxis.categories.map((category) => {
                            switch (timeSeries) {
                                case 'month':
                                    title = `Monthly ${chart_title}`
                                    console.log("Filtered Set for consideration... ",
                                        filter_by_location_game(grouped_orders.ts_month[category], sg.value));
                                    return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_month[category], sg.value),
                                        aggregator_column) / divider)
                                case 'qtr':
                                    title = `Quarterly ${chart_title}`
                                    return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_qtr[category], sg.value),
                                        aggregator_column) / divider)
                                case 'year':
                                    title = `Yearly ${chart_title}`
                                    return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_year[category], sg.value),
                                        aggregator_column) / divider)
                                default:
                                    title = `Monthly ${chart_title}`
                                    return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_month[category], sg.value),
                                        aggregator_column) / divider)
                            }
                        })
                        series.push({name: sg.label, data: chartData});
                        console.log("Series Data for publishing with selected games ... ", series);
                    }
                });
            } else {
                series[0].data = options.xaxis.categories.map((category) => {
                    const divider = (display_money) ? 1000 : 1;

                    let aggregator_column = (metric === 'revenue') ? 'revenue' : (metric === 'footfall') ? 'guests' : 'revenue';

                    switch (timeSeries) {
                        case 'month':
                            title = `Monthly ${chart_title}`
                            return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_month[category]),
                                aggregator_column) / divider)
                        case 'qtr':
                            title = `Quarterly ${chart_title}`
                            return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_qtr[category]),
                                aggregator_column) / divider)
                        case 'year':
                            title = `Yearly ${chart_title}`
                            return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_year[category]),
                                aggregator_column) / divider)
                        default:
                            title = `Monthly ${chart_title}`
                            return Math.ceil(_.sumBy(filter_by_location_game(grouped_orders.ts_month[category]),
                                aggregator_column) / divider)
                    }
                })
                console.log("Series Data for publishing with all games ... ", series);
            }
        }
    }

    const display_chart = () => {
        if (options.xaxis.categories.length > 0 && series[0].data.length > 0) {
            return (
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={'400'}
                />)
        }
        return (
            <div
                className={'p-4 justify-center self-center items-center w-full bg-gray-50 m-4 border border-gray-200 rounded-md shadow-md'}>
                <p className={'text-gray-500 text-4xl font-thin tracking-tight text-center'}>
                    Aggregating data... Select Game(s) or check on all games
                </p>
            </div>
        )
    }

    generate_data_for_charts();
    return (
        <div
            className={'w-auto flex-col h-auto p-2 bg-white border border-gray-200 shadow-md rounded-md">'}>
            <p className={'w-full py-2 text-2xl text-gray-600 font-light tracking-tight text-center'}>
                {title}
            </p>
            <div className={'w-full bg-white'}>
                {display_chart()}
            </div>
            <div className={'w-full flex justify-evenly'}>
                <div className={'w-1/4'}>
                    <HorizontalRadioSelect
                        onSelect={setTimeSeries}
                        defaultValue={'month'}
                        selectOptions={TimeSeriesSelectOptions}/>
                </div>
                <div className={'w-1/4'}>
                    <HorizontalRadioSelect
                        onSelect={setLocation}
                        defaultValue={'all'}
                        selectOptions={locationOptions}/>
                </div>
                <div className={'w-1/4'}>
                    <HorizontalRadioSelect
                        onSelect={setMetric}
                        defaultValue={'revenue'}
                        selectOptions={metricsOptions}/>
                </div>
                <div className={'w-1/4 '}>
                    <HorizontalRadioSelect
                        onSelect={(option) => {
                            if (option === 'all') {
                                setSelectedGames(null);
                            }
                            setGame(option);
                        }}
                        selectOptions={gameOptions}
                        defaultValue={'all'}/>
                </div>
            </div>
            {
                (game !== 'all') ? <MultipleGameSelect
                    location={location}
                    onSelection={setSelectedGames}/> : <div/>
            }
        </div>
    );
}

export {GameMetricsChart}
