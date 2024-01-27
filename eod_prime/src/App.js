import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { PrimeReactProvider } from "primereact/api";
import { TopPanel } from "./panels/TopPanel";
// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
// import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
// import "primereact/resources/themes/lara-dark-indigo/theme.css";
// import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/themes/lara-dark-amber/theme.css"
// import "primereact/resources/themes/viva-dark/theme.css";
// import "primereact/resources/themes/mira/theme.css";
// import "primereact/resources/themes/soho-dark/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ShiftStatusPanel } from "./panels/ShiftStatusPanel";
import { GameStatusPanel } from "./panels/GameStatusPanel";
import { ArchiveListPanel } from "./panels/ArchiveListPanel";
import { useDispatch, useSelector } from "react-redux";
import { fetchMasters } from "./redux/reducers/mastersSlice";
import { fetchEodData } from "./redux/reducers/eodSlice";
import { Toast } from "primereact/toast";

export const ToastContext = createContext();

export const App = () => {
    const dispatch = useDispatch();
    const [displayArchives, setDisplayArchives] = useState(false);
    const toast = useRef(null);
    useEffect(() => {
        dispatch(fetchMasters());
        dispatch(fetchEodData());
    }, []);

    const showPanels = () => {
        if (displayArchives) {
            return <ArchiveListPanel />
        } else {
            return (
                <React.Fragment>
                    <ShiftStatusPanel />
                    <GameStatusPanel />
                </React.Fragment>
            )
        }
    }
    return (
        <PrimeReactProvider>
            <ToastContext.Provider value={toast}>
            <Toast ref={toast}/>
            <div className="card flex flex-column w-max-screen h-full">
                <TopPanel showArchives={()=>setDisplayArchives(!displayArchives)}/>
                {showPanels()}
            </div>
            </ToastContext.Provider>
        </PrimeReactProvider>
    )
}
