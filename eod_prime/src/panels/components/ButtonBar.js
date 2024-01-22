import React from "react"
import { Button } from "primereact/button"

export const ButtonBar = () => {
    return (
        <div className="flex flex-row justify-content-center gap-3 mt-3 py-3">
            <Button label="Submit" icon="pi pi-save" severity="success" rounded/>
            <Button label="Cancel" icon="pi pi-times" severity="warning" rounded/>
        </div>
    )
}