import React, {useState} from "react";
import Select from "react-select";
import {Styles} from "../utils/CommonStyles";
import {useDispatch} from "react-redux";
import {changeFilterTimeSeries} from "../redux/features/filters/filterSlicer";

export const TimeSeriesSelect = () => {
    const [timeSeries, setTimeSeries] = useState(null);
    const dispatch = useDispatch();
    const TimeSeriesOptions = [
        {label: 'Day', value: 'day'},
        {label: 'Week', value: 'week'},
        {label: 'Month', value: 'month'},
        {label: 'Qtr', value: 'qtr'},
        {label: 'Year', value: 'year'},
    ]
    return (
        <div className={'w-full self-center'}>
            <div className={'col-span-1 flex justify-start'}>
                <span className={Styles.select_icon_style}>timer</span>
                <div className={'w-full mx-1 self-center'}>
                    <Select options={TimeSeriesOptions}
                            placeholder={'Change Time Series'}
                            onChange={(selectedOption) => {
                                setTimeSeries(selectedOption.value);
                                dispatch(changeFilterTimeSeries(selectedOption.value))
                            }}
                            defaultValue={timeSeries}/>
                </div>
            </div>
        </div>
    );
}
