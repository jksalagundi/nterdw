import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { changeLocation } from "../redux/playground/mastersSlice";
import { fetchMasters } from "../redux/reducers/mastersSlice";

export const TopPanel = (setLoc) => {
    const location = useSelector((state) => state.masters.selectedLocation);
    const locations = useSelector((state) => state.masters.locations);
    const dispatch = useDispatch();
    return (
        <div className='flex flex-row justify-content-center mx-4 my-2 px-2 py-2 h-auto border-bottom-1'>
            <div className="w-4 flex flex-row justify-content-start gap-2">
                <Button icon="pi pi-bars" size="small"
                    tooltip="Archive" tooltipOptions={{position: "top"}}/>
                <Dropdown value={location} 
                    onChange={(e) => dispatch(changeLocation(e.target.value))}
                    options={locations}
                    optionLabel={"name"}
                    placeholder="Select Location"
                    tooltip="Select Location"/>
            </div>
            <div className="w-4 flex flex-row justify-content-center align-items-center h-3rem">
                <p className="w-full text-2xl text-primary text-center ">EOD Reporting</p>
            </div>
            <div className="w-4 flex flex-row justify-end">
                <Button label='Pull' icon='pi pi-pull' 
                        onClick={()=>{
                            console.log("Pulling masters from DB");
                            dispatch(fetchMasters());
                        }}/>
                <p className="w-full text-xl font-light text-secondary text-right mt-2">
                    {`${new Date().toLocaleString()}`}
                </p>
            </div>
        </div>
    )
}