import React, {useState} from "react";
import Select from "react-select";
import {Styles} from "../utils/CommonStyles";
import {useDispatch} from "react-redux";
import {changeFilterChartType} from "../redux/features/filters/filterSlicer";

export const ChartTypeSelect = () => {
    const [chartType, setChartType] = useState(null);
    const dispatch = useDispatch();
    const ChartTypeOptions = [
        {label: "Revenue", value: 'revenue'},
        {label: "Footfall", value: 'footfall'},
        {label: "Profit", value: 'profit'},
    ]
    return (
        <div className={'w-full self-center'}>
            <div className={'col-span-1 flex justify-start'}>
                <span className={Styles.select_icon_style}>analytics</span>
                <div className={'w-full mx-1 self-center'}>
                    <Select options={ChartTypeOptions}
                            placeholder={'Change ChartType'}
                            onChange={(selectedOption) => {
                                setChartType(selectedOption.value);
                                dispatch(changeFilterChartType(selectedOption.value))
                            }}
                            defaultValue={chartType}/>
                </div>
            </div>
        </div>
    );
}
