import React, {useState} from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import {useDispatch} from "react-redux";
import {updateHeaderLeft} from "../../redux/reducers/formSlice";

export const LeftSidePanel = () => {
    const options = ["AM Shift", "PM Shift"];
    const [shift, setShift] = useState(null); 
    const [shiftLead, setShiftLead] = useState('');
    const [cashBox, setCashBox] = useState(null);
    const [gameSold, setGameSold] = useState(null);
    const dispatch = useDispatch();
    return (
        <div className="card w-6 flex flex-column ml-5 ">
            <div className="card flex flex-row justify-content-start px-4 py-2 ">
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
            <div className="card flex flex-row justify-content-start px-4 py-2 w-8">
                    <InputText id="shiftlead"
                        key="shift_lead_input"
                        tooltip="Name of the shift lead"
                        placeholder="Shift Lead Name"
                        className="w-full"
                        tooltipOptions={{position: "right"}}
                        autoFocus="autoFocus"
                        value={shiftLead}
                        onChange={(e)=> {
                            setShiftLead(e.target.value)
                            dispatch(updateHeaderLeft({ shift: shift, shift_lead: e.target.value,
                                cash_in_box: cashBox, games_sold: gameSold }))

                        }}/>
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 w-8">
                    <InputNumber id="cashBox" value={cashBox}
                            className="p-inputtext-normal w-full"
                            mode="currency" currency="USD" locale="en-US"
                            tooltip="How much cash that is the box?"
                            placeholder="Cash in box"
                            tooltipOptions={{position: "right"}}
                               onValueChange={(e) => {
                                   setCashBox(e.target.value)
                                   dispatch(updateHeaderLeft({ shift: shift, shift_lead: shiftLead,
                                       cash_in_box: e.target.value, games_sold: gameSold }))
                               }} />
            </div>
            <div className="card flex flex-row justify-content-end px-4 py-2  w-8">
                    <InputNumber id="gamesSold" value={gameSold}
                            className="p-inputtext-normal w-full"
                            tooltip="How many games did we book?"
                            placeholder="Games Sold"
                            tooltipOptions={{position: "right"}}
                               onValueChange={(e) => {
                                   setGameSold(e.target.value)
                                   dispatch(updateHeaderLeft({ shift: shift, shift_lead: shiftLead,
                                       cash_in_box: cashBox, games_sold: e.target.value}))
                               }} />
            </div>
        </div>
    );
}
