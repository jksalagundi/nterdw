import React, {useState} from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export const TopPanel = () => {
    const locations = [
        {name: 'McKinney', code:'mckinney'},
        {name: 'Plano', code:'plano'},
    ];

    const [location, setLocation] = useState("");
    const handleLocationChange = () => {

    }
    return (
        <div className='flex flex-row justify-content-center m-2 p-1 surface-0 h-auto'>
            <div className="w-3 flex flex-row justify-start h-3rem">
                <Button icon="pi pi-bars" size="small"
                    tooltip="Archive" tooltipOptions={{position: "top"}}/>
                <Dropdown value={location} 
                    onChange={(e) => setLocation(e.value)}
                    options={locations}
                    optionLabel={"name"}
                    placeholder="Select Location"
                    tooltip="Select Location"/>
            </div>
            <div className="w-5 flex flex-row justify-center h-auto">
                <p className="text-2xl text-primary text-center self-center">EOD Reporting</p>
            </div>
            <div className="w-3 flex flex-row justify-end">
                <p className="text-md text-secondary text-right mt-2">{`${new Date().toLocaleDateString()}`}</p>
            </div>
        </div>
    )
}