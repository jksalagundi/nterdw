import React from "react"
import { Button } from "primereact/button"
import { useSelector, useDispatch } from "react-redux"
import { postEodData } from "../../redux/reducers/eodSlice"

export const ButtonBar = ({setVisibleFlag}) => {
    const dispatch = useDispatch();
    const fdata = useSelector(state => state.form);

    /**
     *   {
        "id": 1,
        "location": 9,
        "report_date": "2024-01-21T11:39:52.823143-06:00",
        "shift": "AM",
        "shift_lead": "Shift Lead",
        "traffic_status": "Light",
        "location_cleaned_status": "Not cleaned",
        "games_sold": 0,
        "walkins_declined": 0,
        "cash_in_box": 300,
        "inventory_reorder": "Toilet Paper",
        "eod_notes": "Everything was hunky dory",
        "created_date": "2024-01-21T11:39:52.823170-06:00",
        "modified_date": null
    },
     */
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
        console.log("Will be posting this data ... ", formData);
        dispatch(postEodData(formData));
        setVisibleFlag(false);
    }

    return (
        <div className="flex flex-row justify-content-center gap-3 mt-3 py-3">
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