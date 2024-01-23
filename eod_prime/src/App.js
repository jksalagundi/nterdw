import React, {useEffect} from "react";
import {PrimeReactProvider} from "primereact/api";
import { TopPanel } from "./panels/TopPanel";
import "primereact/resources/themes/lara-dark-amber/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ShiftStatusPanel } from "./panels/ShiftStatusPanel";
import { GameStatusPanel } from "./panels/GameStatusPanel";
import {useSelector, useDispatch} from "react-redux";
import {fetchMasters} from "./redux/reducers/mastersSlice";
// import {fetchEODReports} from "./redux/reducers/eodReportSlice";

export const App = () => {
    const dispatch = useDispatch();
    const mastersLoading = useSelector( state => state.masters.status);
    const reportsLoading = useSelector(state => state.eod.status);
    useEffect(()=>{
        dispatch(fetchMasters())
        // dispatch(fetchEODReports())
    },[mastersLoading, reportsLoading]);
    return(
        <PrimeReactProvider>
            <div className="card flex flex-column w-max-screen h-full">
                <TopPanel />
                <ShiftStatusPanel/>
                <GameStatusPanel/>
            </div>
        </PrimeReactProvider>
    )
}
