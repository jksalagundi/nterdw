import React, {useRef} from "react"
import { Button } from "primereact/button"
import { useSelector, useDispatch } from "react-redux"
import { postEodData } from "../../redux/reducers/eodSlice"

const __build_form_data = (fdata) => {
    if (!fdata) return new FormData();
    let form = new FormData();
    form.append("location",fdata.selectedLocation.id);
    form.append("shift", fdata.eod_report_header.shift.substring(0,2));
    form.append("traffic_status",fdata.eod_report_header.traffic_status);
    form.append("shift_lead",fdata.eod_report_header.shift_lead);
    form.append("location_cleaned_status", fdata.eod_report_header.location_cleaned_status);
    form.append("games_sold", fdata.eod_report_header.games_sold);
    form.append("walkins_declined",fdata.eod_report_header.walkins_declined);
    form.append("inventory_reorder",fdata.eod_report_header.inventory_reorder);
    form.append("eod_notes", fdata.eod_notes);
    if (fdata.eod_report_details && fdata.eod_report_details.length > 0){
        let details = [];
        fdata.eod_report_details.map((item) => {
            details.push({
                game_id: item.id,
                status: item.status,
                details: item.details
            });
        })
        form.append("game_status", JSON.stringify(details));
    }
    return form;
}

export const ButtonBar = ({setVisibleFlag}) => {
    const dispatch = useDispatch();
    const fdata = useSelector(state => state.form);
    const status = useSelector(state => state.eod.status);

    const handleSubmit = () => {
        // **** Very important step.. To convert internal data from state to Form Data
        // **** Without this DRF will not post data
        // -------------------------------------------
        const formData = __build_form_data(fdata);
        // -------------------------------------------
        dispatch(postEodData(formData));
        setVisibleFlag(false);
    }

    return (
        <div className="flex flex-row justify-content-center gap-3 mt-1 py-1">
            <Button
                label="Submit" icon="pi pi-save"
                onClick={handleSubmit}
                severity="success" rounded/>
            <Button label="Cancel" icon="pi pi-times"
                onClick={()=>setVisibleFlag(false)}
                severity="warning" rounded/>
                
        </div>
    )
}
