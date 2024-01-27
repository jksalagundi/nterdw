import React, { useState, useContext } from "react"
import { Button } from "primereact/button"
import { useSelector, useDispatch } from "react-redux"
import { postEodData } from "../../redux/reducers/eodSlice"
import { Message } from "primereact/message"
import { ToastContext } from "../../App"


const __build_form_data = (fdata) => {
    if (!fdata) return new FormData();
    let form = new FormData();
    form.append("location", fdata.selectedLocation.id);
    form.append("shift", fdata.eod_report_header.shift.substring(0, 2));
    form.append("traffic_status", fdata.eod_report_header.traffic_status);
    form.append("shift_lead", fdata.eod_report_header.shift_lead);
    form.append("location_cleaned_status", fdata.eod_report_header.location_cleaned_status);
    form.append("cash_in_box", (fdata.eod_report_header.cash_in_box ? fdata.eod_report_header.cash_in_box : 0));
    form.append("games_sold", (fdata.eod_report_header.games_sold ? fdata.eod_report_header.games_sold : 0));
    form.append("walkins_declined", (fdata.eod_report_header.walkins_declined ? fdata.eod_report_header.walkins_declined : 0));
    form.append("inventory_reorder", fdata.eod_report_header.inventory_reorder);
    form.append("eod_notes", fdata.eod_notes);
    if (fdata.eod_report_details && fdata.eod_report_details.length > 0) {
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
    form.append("existing_form_id", fdata.existing_form_id);
    form.append("resend_status", fdata.resend_status);
    return form;
}


export const ButtonBar = ({ setVisibleFlag }) => {
    const dispatch = useDispatch();
    const fdata = useSelector(state => state.form);
    const toast = useContext(ToastContext);


    const handleSubmit = () => {
        let errors = [];
        if (!fdata.eod_report_header.shift) {
            errors.push("A valid Shift must be selected");
        }
        if (!fdata.eod_report_header.shift_lead || fdata.eod_report_header.shift_lead.length < 2) {
            errors.push("Shift lead name must be entered");
        }
        if (!fdata.eod_report_header.traffic_status) {
            errors.push("Traffic Status for the location has to be selected");
        }

        if (!fdata.eod_report_header.location_cleaned_status) {
            errors.push("Cleaned Status for the location has to be selected");
        }

        if (!fdata.eod_report_header.inventory_reorder) {
            errors.push("Inventory reorder has to be entered");
        }

        if (!fdata.eod_notes || fdata.eod_notes.length < 2) {
            errors.push("Valid EOD Notes have to be entered ");
        }
        errors.forEach((error) => showError(error));

        if (errors.length === 0) {
            // **** Very important step.. To convert internal data from state to Form Data
            // **** Without this DRF will not post data
            // -------------------------------------------
            const formData = __build_form_data(fdata);
            dispatch(postEodData(formData));
        } else {
            showError(`Form has ${errors.length} errors. Please fix them before submitting`);
        }
        setVisibleFlag(false);
    }

    const showError = (message) => {
        if (toast && toast.current) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: message });
        }
    }

    return (
        <div className="flex flex-column justify-content-center gap-1">
            {/* {showValidationError()} */}
            <div className="flex flex-row justify-content-center gap-3 py-1">
                <Button
                    label="Submit" icon="pi pi-save"
                    onClick={handleSubmit}
                    severity="success" rounded />
                <Button label="Cancel" icon="pi pi-times"
                    onClick={() => setVisibleFlag(false)}
                    severity="warning" rounded />
            </div>
        </div>
    )
}
