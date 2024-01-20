import React, {useState} from "react";
import Chart from "react-apexcharts";
import _ from "lodash";
import {TimeSeriesUtils} from "../../utils/TimeSeriesUtils";
import {get_chart_options} from "../../utils/ApexChartOptions";
import {HorizontalRadioSelect} from "../../components/HorizontalRadioSelect";
import {ButtonBar} from "../../components/ButtonBar";

const NTERBarChart = ({orders, chart_title, y_axis_title, fill_colors, aggregator_column, show_revenue=true}) => {
    const [timeSeries, setTimeSeries] = useState('month');
    const [location, setLocation] = useState('all')
    const [maxCount, setMaxCount] = useState(15);
    // {label: 'Week', value: 'week'},
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
    let Series = [
        {name: chart_title, data: []}
    ];

    let options = _.cloneDeep(get_chart_options(y_axis_title, fill_colors, show_revenue));
    let series = _.cloneDeep(Series);
    let title;

    const filter_by_location = (orders) => {
        switch (location){
            case 'plano':
                return _.filter(orders, {'location': 'Plano'})
            case 'mckinney':
                return _.filter(orders, {'location': 'McKinney'})
            default:
                return orders
        }
    }

    if (orders && !_.isEmpty(orders.ts_month)) {
        options.xaxis.categories = TimeSeriesUtils.generate_time_series_labels(timeSeries, maxCount);
        series[0].data = options.xaxis.categories.map((category) => {
            const divider = (show_revenue)? 1000 : 1;
            switch (timeSeries) {
                case 'month':
                    title = `Monthly ${chart_title}`
                    return Math.ceil(_.sumBy(filter_by_location(orders.ts_month[category]), aggregator_column) / divider)
                case 'qtr':
                    title = `Quarterly ${chart_title}`
                    return Math.ceil(_.sumBy(filter_by_location(orders.ts_qtr[category]), aggregator_column) / divider)
                case 'year':
                    title = `Yearly ${chart_title}`
                    return Math.ceil(_.sumBy(filter_by_location(orders.ts_year[category]), aggregator_column) / divider)
                default:
                    title = `Monthly ${chart_title}`
                    return Math.ceil(_.sumBy(filter_by_location(orders.ts_month[category]), aggregator_column) / divider)
            }
        })
    }

    // console.log("Options & Series Data ... ", options, series);
    if (options.xaxis.categories.length > 0 && series[0].data.length > 0) {
        return (
            <div className={'w-auto flex-col p-2 '}>
                <div className="w-auto h-auto p-2 bg-white-50 border border-gray-200 shadow-md rounded-md">
                    <p className={'text-2xl text-gray-600 font-light tracking-tight text-center'}>
                        {`${title} for ${location} location(s) `}
                    </p>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={'400'}
                    />
                    <div className={'w-full flex justify-evenly'}>
                        <div className={'w-1/5 w-full flex'}>
                            <ButtonBar onClick={(button)=>{
                                switch(button){
                                    case 'increase':
                                        setMaxCount(maxCount+1)
                                        break;
                                    case 'decrease':
                                        setMaxCount(maxCount-1)
                                        break;
                                    default:
                                        break;
                                }
                                }}/>
                        </div>
                        <div className={'w-2/5 w-full '}>
                            <HorizontalRadioSelect
                                onSelect={setTimeSeries}
                                defaultValue={'month'}
                                selectOptions={TimeSeriesSelectOptions}/>
                        </div>
                        <div className={'w-2/5 w-full '}>
                            <HorizontalRadioSelect
                                onSelect={setLocation}
                                defaultValue={'all'}
                                selectOptions={locationOptions}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div
            className={'p-4 justify-center self-center items-center w-full bg-gray-50 m-4 border border-gray-200 rounded-md shadow-md'}>
            <p className={'text-gray-500 text-4xl font-thin tracking-tight text-center'}>
                Aggregating data... Please wait
            </p>
        </div>
    )
}

export {NTERBarChart}
