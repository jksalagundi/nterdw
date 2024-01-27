import React, {useState} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { ShowReport } from "./components/ShowReport";
import { showTrafficStatus, showCleanlinessStatus, showOperationalStatus } from "./components/StatusComponents";
import _ from "lodash";

export const ArchiveListPanel = () => {
    const eod_reports = useSelector(state => state.eod.eod_reports);
    const locations = useSelector(state => state.masters.locations);

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
    return (
        <div className="card flex m-3 p-3 justify-content-center">
            <DataTable value={eod_reports}
                size="small"
                showGridlines stripedRows
                scrollable
                scrollHeight={`${window.innerHeight - 500}px`}
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
                <Column header="Show Report" body={showButton}></Column>
            </DataTable>
            <ShowReport active={dialogVisible} setActive={setDialogVisible} report={currentReport}/>
        </div>
    )
}