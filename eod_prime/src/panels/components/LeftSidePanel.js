import React, {useState} from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import {useDispatch} from "react-redux";
import {updateHeaderLeft} from "../../redux/reducers/formSlice";

export const LeftSidePanel = () => {
    const options = ["AM Shift", "PM Shift"];
    const [shift, setShift] = useState(options[0]);
    const [shiftLead, setShiftLead] = useState('');
    const [cashBox, setCashBox] = useState(0);
    const [gameSold, setGameSold] = useState(0);
    const dispatch = useDispatch();
    return (
        <div className="card w-5 flex flex-column m-1 ">
            <div className="card flex flex-row justify-content-end px-4 py-2">
                <SelectButton
                    options={options}
                    value={shift}
                    tooltip="Which shift are you reporting ?"
                    onChange={(e) => {
                        setShift(e.value);
                        dispatch(updateHeaderLeft({ shift: e.value, shift_lead: shiftLead,
                            cash_in_box: cashBox, games_sold: gameSold }))
                    }} />
            </div>
            <div className="card flex flex-row justify-content-end px-4 py-2 mt-2">
                <span className="p-float-label">
                    <InputText id="shiftlead"
                        key="shift_lead_input"
                        tooltip="Name of the shift lead"
                        tooltipOptions={{position: "left"}}
                        autoFocus="autoFocus"
                        value={shiftLead}
                        onChange={(e)=> {
                            setShiftLead(e.target.value)
                            dispatch(updateHeaderLeft({ shift: shift, shift_lead: e.target.value,
                                cash_in_box: cashBox, games_sold: gameSold }))

                        }}/>
                    <label htmlFor="shiftlead">Shift Lead</label>
                </span>
            </div>
            <div className="card flex flex-row justify-content-end px-4 py-2 mt-3">
                <span className="p-float-label">
                    <InputNumber id="cashBox" value={cashBox}
                            className="p-inputtext-normal"
                            tooltip="How much cash that is the box?"
                            tooltipOptions={{position: "left"}}
                               onValueChange={(e) => {
                                   setCashBox(e.target.value)
                                   dispatch(updateHeaderLeft({ shift: shift, shift_lead: shiftLead,
                                       cash_in_box: e.target.value, games_sold: gameSold }))
                               }} />
                    <label htmlFor="cashBox">Cash in the Box</label>
                </span>
            </div>
            <div className="card flex flex-row justify-content-end px-4 py-2 mt-4">
                <span className="p-float-label">
                    <InputNumber id="gamesSold" value={gameSold}
                            className="p-inputtext-normal"
                            tooltip="How many games did we book?"
                            tooltipOptions={{position: "left"}}
                               onValueChange={(e) => {
                                   setGameSold(e.target.value)
                                   dispatch(updateHeaderLeft({ shift: shift, shift_lead: shiftLead,
                                       cash_in_box: cashBox, games_sold: e.target.value}))
                               }} />
                    <label htmlFor="gamesSold">Games Sold</label>
                </span>
            </div>
        </div>
    );
}
