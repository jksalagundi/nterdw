import React, {useState} from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export const RightSidePanel = () => {
    const options = ["Light","Busy","Very Busy"];
    const cleaned = [ "Not Cleaned", "Facility Cleaned","Facility Deep Cleaned"];
    const [shift, setShift] = useState(options[0]);
    const [facilityCleaned, setFacilityCleaned] = useState(cleaned[0]);
    const [reorder, setReorder] = useState('');
    const [walkinsDeclined, setWalkinsDeclined] = useState(0);
    return (
        <div className="card w-7 flex flex-column m-1">
            <div className="card flex flex-row justify-content-start px-4 py-2">
                <SelectButton
                    options={options}
                    value={shift}
                    tooltip={"How was the traffic at the location ?"}
                    onChange={(e) => setShift(e.value)} />
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 mt-1">
                <SelectButton
                    options={cleaned}
                    value={facilityCleaned}
                    tooltip={"Was the facility cleaned ?"}
                    onChange={(e) => setFacilityCleaned(e.value)} />
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 mt-4">
                <span className="p-float-label">
                    <InputNumber id="walkinsDeclined" value={walkinsDeclined} 
                            className="p-inputtext-normal"
                            tooltip="How many customer walkins were declined ?"
                               onValueChange={(e) => setWalkinsDeclined(e.target.value)} />
                    <label htmlFor="walkinsDeclined">Walkins Declined</label>
                </span>
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 mt-3">
                <span className="p-float-label">
                    <InputText id="reorder" 
                        key="shift_lead_input"
                        autoFocus="autoFocus"
                        value={reorder}
                        onChange={(e)=>setReorder(e.target.value)}/>
                    <label htmlFor="reorder">Inventory Reorder</label>
                </span>
            </div>
        </div>
    )
}