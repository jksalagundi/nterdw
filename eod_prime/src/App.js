import React, {useEffect, useState} from "react";
import {PrimeReactProvider} from "primereact/api";
import { TopPanel } from "./panels/TopPanel";
import "primereact/resources/themes/lara-dark-amber/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ShiftStatusPanel } from "./panels/ShiftStatusPanel";
import { GameStatusPanel } from "./panels/GameStatusPanel";
import axios from "axios";

export const App = () => {

    // const [locations, setLocations] = useState([]);
    // const [loading, setLoading] = useState(false);
    // useEffect(()=>{
    //     console.log("Will be fetching data from server...");
    //     axios.get("http://localhost:8000/masters/locations")
    //         .then((res)=>{
    //             console.log("Got this", res.data)
    //             setLocations(res.data);
    //             setLoading(true);
    //         });
    // }, [loading]);
  
    return(
        <PrimeReactProvider>
            <div className="card flex flex-column w-max-screen h-full">
                {/* {(locations && locations.length > 0) ? 
                    <h1>{locations[0].location_name}</h1>: <p>{`Not found`}</p>} */}
                <TopPanel /> 
                <ShiftStatusPanel/>
                <GameStatusPanel/>
            </div>
        </PrimeReactProvider>
    )
}