import React from "react";
import { LeftSidePanel } from "./components/LeftSidePanel";
import { RightSidePanel } from "./components/RightSidePanel";
import { useSelector } from "react-redux";
import {Message} from "primereact/message";

export const ShiftStatusPanel = () => {
  
    const selectedLocation = useSelector(state => state.form.selectedLocation);

    const showMessage = () => {
        return (
            <div className="flex justify-content-center">
                <Message severity="info" text="Please select a location to report"/>
            </div>
        )
    }

    const showPanels = () => {
        return (
        <div className="w-full flex flex-row">
            <LeftSidePanel />
            <RightSidePanel/>
        </div>
        )
    }
    return (selectedLocation === null) ? showMessage() : showPanels()
}