import React, {useRef} from "react";
import {PrimeReactProvider} from "primereact/api";
import {Toast} from "primereact/toast";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-dark-amber/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { TopPanel } from "./panels/topPanel";
import { ShiftStatusPanel } from "./panels/shiftStatusPanel";

function App() {
    const toastRef = useRef();

    return (
        <PrimeReactProvider>
            <Toast ref={toastRef}/>
            <div className={'card'}>
                <TopPanel/>
                <ShiftStatusPanel/>
            </div>
        </PrimeReactProvider>
    );
}

export default App;
