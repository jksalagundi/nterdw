import React from "react";
import {PrimeReactProvider} from "primereact/api";
import { TopPanel } from "./panels/TopPanel";
import "primereact/resources/themes/lara-dark-amber/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ShiftStatusPanel } from "./panels/ShiftStatusPanel";
import { GameStatusPanel } from "./panels/GameStatusPanel";

export const App = () => {
  
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