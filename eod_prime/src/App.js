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

export const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.masters.loading );
    useEffect(()=>{
        dispatch(fetchMasters())
    },[loading]);
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
