import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";

export const ShiftStatusPanel = () => {
    const options = ["AM Shift", "PM Shift"];
    const [shift, setShift] = useState(options[0]);
    const [shiftLead, setShiftLead] = useState("");
    const [cashBox, setCashBox] = useState(0);
    const LeftSidePanel = () => {
       return (
        <div className="card w-6 flex flex-column m-4">
            <div className="card flex flex-row justify-content-end">
                <label className="mr-2 self-center">Shift</label>
                <SelectButton options={options} 
                              value={shift} 
                              onChange={(e) => setShift(e.value)}/>
            </div>
        </div>
       ) 
    }

    return (
        <div className="w-full flex flex-row">
            <LeftSidePanel/>
        </div>
    )
}