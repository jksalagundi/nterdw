import React, {useState, useContext} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { ShowReport } from "./components/ShowReport";
import { showTrafficStatus, showCleanlinessStatus, showOperationalStatus } from "./components/StatusComponents";
import { sendEmail } from "../redux/reducers/eodSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { ToastContext } from "../App";

export const ArchiveListPanel = () => {
    const eod_reports = useSelector(state => state.eod.eod_reports);
    const locations = useSelector(state => state.masters.locations);
    const dispatch = useDispatch();
    const toast = useContext(ToastContext);

    const showReportDate = (report) => {
        return report.report_date.substring(0, 10)
    }

    const showLocaton = (report) => {
        let index = _.findIndex(locations, {id: report.location});
        return (index !== -1 ? locations[index].location_name.toUpperCase() : `No Location`);
    }

    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);

    const showButton = (report) => {
        return (
            <Button icon="pi pi-external-link"
                onClick={() => {
                    setDialogVisible(true);
                    setCurrentReport(report);
                 }} />)
    }

    const sendEmailButton = (report) => {
        let data = {
            location: report.location,
            report_date: report.report_date.substring(0,10),
            shift: report.shift
        };
        if (report.report_emailed){
            return <Button icon="pi pi-telegram" disabled/>
        } 
        return (
            <Button icon="pi pi-telegram"
                onClick={() => {
                    dispatch(sendEmail(data));
                    if (toast && toast.current){
                        toast.current.show({severity: "info", summary: "Sent", detail: "Email request sent successfully. Check after a minute"})
                    }
                 }} />) 
    }
    return (
        <div className="card flex m-3 p-3 justify-content-center">
            <DataTable value={eod_reports}
                size="small"
                showGridlines stripedRows
                scrollable
                scrollHeight={`${window.innerHeight - 200}px`}
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="report_date"
                    body={showReportDate}
                    header="Report Date" sortable ></Column>
                <Column field="shift" header="Shift" sortable></Column>
                <Column field="location.location_name" sortable
                    body={showLocaton}
                    header="Location"></Column>
                <Column header="Traffic" body={showTrafficStatus}></Column>
                <Column header="Cleanliness" body={showCleanlinessStatus}></Column>
                <Column header="Operational" body={showOperationalStatus}></Column>
                <Column header="Show" body={showButton}></Column>
                <Column header="Email" body={sendEmailButton}></Column>
            </DataTable>
            <ShowReport active={dialogVisible} setActive={setDialogVisible} report={currentReport}/>
        </div>
    )
}