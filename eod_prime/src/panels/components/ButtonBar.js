import React, {useRef} from "react"
import { Button } from "primereact/button"
import { useSelector, useDispatch } from "react-redux"
import { postEodData } from "../../redux/reducers/eodSlice"
import { Toast } from "primereact/toast";

export const ButtonBar = ({setVisibleFlag}) => {
    const dispatch = useDispatch();
    const fdata = useSelector(state => state.form);
    const toast = useRef(null);
    const status = useSelector(state => state.eod.status);

    const createDataToPost = () => {
        let data = {};
        if (fdata){
            data.location = fdata.selectedLocation.id;
            data.shift = fdata.eod_report_header.shift;
            data.traffic_status = fdata.eod_report_header.traffic_status;
            data.shift_lead = fdata.eod_report_header.shift_lead;
            data.location_cleaned_status = fdata.eod_report_header.location_cleaned_status;
            data.games_sold = fdata.eod_report_header.games_sold;
            data.walkins_declined = fdata.eod_report_header.walkins_declined;
            data.inventory_reorder = fdata.eod_report_header.inventory_reorder;
            data.eod_notes = fdata.eod_notes;
        }
        return data;
    }

    const handleSubmit = () => {
        const formData = createDataToPost();
        dispatch(postEodData(formData));
        setVisibleFlag(false);
        toast.current.show({severity: 'info', summary: "Success", detail: "Successfully posted EOD Report"})
    }
    // console.log("Status & Toast ", status, toast);
    // if (status && status === 'Posted' && toast){
    //     toast.current.show({severity: 'info', summary: "Success", detail: "Successfully posted EOD Report"})
    // }
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
