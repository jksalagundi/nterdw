import React, { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { showCleanlinessStatus, showOperationalStatus, showTrafficStatus } from "./StatusComponents";
import { useSelector } from "react-redux";
import { Rating } from "primereact/rating";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import _ from "lodash";

const GameStatus = ({ game, game_name }) => {
    const status_value = (game.status === "Good") ? 3 : (game.status === "Functional") ? 1 : 0;
    return (
        <div className="card flex flex-row gap-4 justify-content-evenly">
            <span>{game_name}</span>
            <Rating value={status_value} readOnly cancel={false} />
            <span>{game.details}</span>
        </div>
    )
}
export const ShowReport = ({ active, setActive, report }) => {
    const games = useSelector(state => state.masters.games);
    const notesRef = useRef(null);
    const locations = useSelector(state => state.masters.locations);
    // useEffect(() => {
    //     if (notesRef !== null && report !== null){
    //         notesRef.current.dangerouslySetInnerHTML = report.eod_notes;
    //     }
    // });
    if (report) {
        const index = _.findIndex(locations, {id: report.location});
        const name = (index !== -1 ? locations[index].location_name : `No location`);
        const title = `Shift Report for ${name.toUpperCase()} 
            on ${report.report_date.substring(0, 10)} for ${report.shift} Shift`;

        const formatGameId = (game) => {
            const index = _.findIndex(games, { 'id': game.game_id });
            return (index !== -1) ? games[index].name : `Game - Unknown`;
        }

        const formatStatus = (game) => {
            const severityRating = (game.status === "Good" ? 5 : (game.status === "Functional" ? 3 : 0));
            return <Rating value={severityRating} cancel={false} readOnly/>
        }

       
      
        return (
            <Dialog visible={active}
                style={{ width: "75%", height: "auto" }}
                className="flex flex-column gap-0 justify-content-center"
                onHide={() => setActive(false)}>
                <p className="text-2xl text-center font-light">{title}</p>
                <hr />
                <div className="flex flex-row gap-2 w-full justify-content-center py-1">
                    <span className="text-lg text-center font-light">Filed By: </span>
                    <span className="text-lg text-center ">{report.shift_lead}</span>
                </div>
                <div className="card flex flex-row gap-4 w-full py-1 ">
                    <div className="flex flex-row w-5 justify-content-end border-0">
                        <span className="text-lg  font-light pr-2">Traffic Status: </span>
                        {showTrafficStatus(report)}
                    </div>
                    <div className="flex flex-row w-7 justify-content-start border-0">
                        <span className="text-lg font-light pr-2">Cleaniness: </span>
                        {showCleanlinessStatus(report)}
                    </div>
                </div>
                <div className="card flex flex-row gap-4 py-1 w-full">
                    <div className="flex flex-row w-5 justify-content-end border-0">
                        <span className="text-lg font-light pr-2">Games Sold: </span>
                        <span className="text-lg ">{report.games_sold}</span>
                    </div>
                    <div className="flex flex-row w-7 justify-content-start border-0">
                        <span className="text-lg font-light pr-2">Walkins Declined: </span>
                        <span className="text-lg ">{report.walkins_declined}</span>
                    </div>
                </div>
                <div className="card flex flex-row gap-4 py-1 w-full">
                    <div className="flex flex-row w-5 justify-content-end border-0">
                        <span className="text-lg  font-light pr-2">Cash: </span>
                        <span className="text-lg ">{report.cash_in_box.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-row w-7 justify-content-start border-0">
                        <span className="text-lg font-light pr-2">Inventory Reorder: </span>
                        <span className="text-lg ">{report.inventory_reorder}</span>
                    </div>
                </div>
                <div className="card py-1">
                    <DataTable value={report.game_status} scrollable size="small"
                        scrollHeight="250px" stripedRows showGridlines>
                            <Column header="Game" body={formatGameId} style={{width: "20%"}}/>
                            <Column header="Status" style={{width: "10%"}} body={formatStatus}/>
                            <Column header="Details" field={"details"} style={{maxWidth: "70%"}}/>
                    </DataTable>
                </div>
                <div className="card my-2" style={{height: "200px"}}>
                    <p className="text-md font-light"  
                        dangerouslySetInnerHTML={{__html: report.eod_notes}} >
                    </p>
                </div>
            </Dialog>
        )
    } else return (<React.Fragment />)
}