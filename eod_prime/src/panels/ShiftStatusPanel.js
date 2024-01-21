import React, { useState } from "react";
import { LeftSidePanel } from "./components/LeftSidePanel";
import { RightSidePanel } from "./components/RightSidePanel";

export const ShiftStatusPanel = () => {
   

    return (
        <div className="w-full flex flex-row my-0">
            <LeftSidePanel />
            <RightSidePanel/>
        </div>
    )
}