import React  from "react";
import {useSelector} from "react-redux";
import {TimeSeriesSelect} from "../../components/TimeSeriesSelect";
import {LocationSelect} from "../../components/LocationSelect";
import {GameSelect} from "../../components/GameSelect";
import {ChartTypeSelect} from "../../components/ChartTypeSelect";


export const FilterPanel = () => {

    const filterState = useSelector(state => state.filter);
    console.log("FilterState ... ", filterState);
    return (
        <div className={'w-full h-auto mx-1 my-2 p-4 border border-gray-100 round-md shadow-sm grid grid-cols-4'}>
            <TimeSeriesSelect/>
            <LocationSelect/>
            <GameSelect/>
            <ChartTypeSelect/>
        </div>
    )
}
