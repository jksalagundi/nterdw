import React, {useState} from "react";
import Select from "react-select";
import {Styles} from "../utils/CommonStyles";
import {useDispatch} from "react-redux";
import {changeFilterLocation} from "../redux/features/filters/filterSlicer";

export const LocationSelect = () => {
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();
    const LocationOptions = [
        {label: 'All', value: 'all'},
        {label: 'McKinney', value: 'mckinney'},
        {label: 'Plano', value: 'plano'},
    ]
    return (
        <div className={'w-full self-center'}>
            <div className={'col-span-1 flex justify-start'}>
                <span className={Styles.select_icon_style}>location_on</span>
                <div className={'w-full mx-1 self-center'}>
                    <Select options={LocationOptions}
                            placeholder={'Change Location'}
                            onChange={(selectedOption) => {
                                setLocation(selectedOption.value);
                                dispatch(changeFilterLocation(selectedOption.value))
                            }}
                            defaultValue={location}/>
                </div>
            </div>
        </div>
    );
}
