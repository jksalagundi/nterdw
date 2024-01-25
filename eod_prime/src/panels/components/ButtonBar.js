import React, {useRef} from "react"
import { Button } from "primereact/button"
import { useSelector, useDispatch } from "react-redux"
import { postEodData } from "../../redux/reducers/eodSlice"
import { Toast } from "primereact/toast";

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
    return form;
}

export const ButtonBar = ({setVisibleFlag}) => {
    const dispatch = useDispatch();
    const fdata = useSelector(state => state.form);
    const toast = useRef(null);
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
        <div className="flex flex-row justify-content-center gap-3 mt-3 py-3">
            <Toast ref={toast}/>
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
