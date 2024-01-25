import React, {useEffect} from "react";
import {PrimeReactProvider} from "primereact/api";
import { TopPanel } from "./panels/TopPanel";
// import "primereact/resources/themes/md-dark-indigo/theme.css";
// import "primereact/resources/themes/lara-dark-amber/theme.css"
// import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/themes/soho-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ShiftStatusPanel } from "./panels/ShiftStatusPanel";
import { GameStatusPanel } from "./panels/GameStatusPanel";
import {useDispatch, useSelector} from "react-redux";
import {fetchMasters} from "./redux/reducers/mastersSlice";
import { fetchEodData } from "./redux/reducers/eodSlice";

export const App = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchMasters());
        dispatch(fetchEodData());
        
    },[]);
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
