import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import {changeLocation, initiateGameStatus} from "../redux/reducers/formSlice";
// import { fetchMasters } from "../redux/reducers/mastersSlice";

export const TopPanel = (setLoc) => {
    const selectedLocation = useSelector((state) => state.form.selectedLocation);
    const locations = useSelector((state) => state.masters.locations);
    const games = useSelector((state) => state.masters.games);
    const dispatch = useDispatch();
    const location_names = locations.map((item) => {
        return {name: item.location_name, label: item.location_name.toUpperCase(), id: item.id}
    });
    return (
        <div className='flex flex-row justify-content-center mx-4 my-2 px-2 py-2 border-bottom-1 h-4rem'>
            <div className="w-4 flex flex-row justify-content-start gap-2">
                <Button icon="pi pi-bars" size="small"
                    tooltip="Archive" tooltipOptions={{position: "top"}}/>
                <Dropdown value={selectedLocation}
                    onChange={(e) => {
                        dispatch(changeLocation(e.value));
                        dispatch(initiateGameStatus({games, selectedLocation: e.value}));
                    }}
                    options={location_names}
                    optionLabel={"label"}
                    placeholder="Select Location"
                    tooltip="Select Location"/>
            </div>
            <div className="w-4 flex flex-row justify-content-center">
                <p className="w-full text-2xl text-primary text-center font-bold mt-2"
                    style={{letterSpacing: `-1px`}}>
                    EOD Reporting
                </p>
            </div>
            <div className="w-4 flex flex-row justify-end">
                <p className="w-full text-lg font-light text-secondary text-right mt-3"
                    style={{letterSpacing: `-1px`}}>
                    {`${new Date().toLocaleString()}`}
                </p>
            </div>
        </div>
    )
}
