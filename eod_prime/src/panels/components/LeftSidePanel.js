import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { useDispatch, useSelector } from "react-redux";
import { updateHeaderLeft } from "../../redux/reducers/formSlice";

export const LeftSidePanel = () => {
    const options = ["AM Shift", "PM Shift"];
    const [shift, setShift] = useState(null);
    const [shiftLead, setShiftLead] = useState('');
    const [cashBox, setCashBox] = useState(null);
    const [gameSold, setGameSold] = useState(null);
    const dispatch = useDispatch();
    const eod_reports = useSelector(state => state.eod.eod_reports);
    const checkForDuplicateRecord = (shift) => {
        let found = false;
        eod_reports.forEach((report) => {
            const d = report.report_date;
            let dc = {
                year: Number(d.substring(0, 4)), month: Number(d.substring(5, 7)),
                day: Number(d.substring(8, 10))
            };
            // console.log("Report date ... ", dc);
            let today = new Date();
            found = (dc.year === today.getFullYear() && dc.day === today.getDate()
                && dc.month == today.getMonth() + 1);
            // console.log("Today's date ... ", today.getFullYear(), today.getDate(), today.getMonth());
            console.log("Found after date check", found);
            console.log(" Shifts ", shift, report.shift);
            found = found && (shift.substring(0, 2) === report.shift)
            console.log("Report Date, Todays Date, Found, Shift ", dc, (new Date()), found, shift);
        });
        return found;
    }

    return (
        <div className="card w-6 flex flex-column ml-5 ">
            <div className="card flex flex-row justify-content-start px-4 py-2 ">
                <SelectButton
                    options={options}
                    value={shift}
                    tooltip="Which shift are you reporting ?"
                    onChange={(e) => {
                        setShift(e.value);
                        const found = checkForDuplicateRecord(e.value);
                        dispatch(updateHeaderLeft({
                            shift: e.value, shift_lead: shiftLead,
                            cash_in_box: cashBox, games_sold: gameSold
                        }))
                    }} />
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 w-8">
                <InputText id="shiftlead"
                    key="shift_lead_input"
                    tooltip="Name of the shift lead"
                    placeholder="Shift Lead Name"
                    className="w-full"
                    tooltipOptions={{ position: "right" }}
                    autoFocus="autoFocus"
                    value={shiftLead}
                    onChange={(e) => {
                        setShiftLead(e.target.value)
                        dispatch(updateHeaderLeft({
                            shift: shift, shift_lead: e.target.value,
                            cash_in_box: cashBox, games_sold: gameSold
                        }))

                    }} />
            </div>
            <div className="card flex flex-row justify-content-start px-4 py-2 w-8">
                <InputNumber id="cashBox" value={cashBox}
                    className="p-inputtext-normal w-full"
                    mode="currency" currency="USD" locale="en-US"
                    tooltip="How much cash that is the box?"
                    placeholder="Cash in box"
                    tooltipOptions={{ position: "right" }}
                    onValueChange={(e) => {
                        setCashBox(e.target.value)
                        dispatch(updateHeaderLeft({
                            shift: shift, shift_lead: shiftLead,
                            cash_in_box: e.target.value, games_sold: gameSold
                        }))
                    }} />
            </div>
            <div className="card flex flex-row justify-content-end px-4 py-2  w-8">
                <InputNumber id="gamesSold" value={gameSold}
                    className="p-inputtext-normal w-full"
                    tooltip="How many games did we book?"
                    placeholder="Games Sold"
                    tooltipOptions={{ position: "right" }}
                    onValueChange={(e) => {
                        setGameSold(e.target.value)
                        dispatch(updateHeaderLeft({
                            shift: shift, shift_lead: shiftLead,
                            cash_in_box: cashBox, games_sold: e.target.value
                        }))
                    }} />
            </div>
        </div>
    );
}
