import React from "react";
import {MastersList} from "./features/ masters/MastersList";

const App = () => {
    const toolbar = () => {
        return (
            <div className="container p-2 bg-gray-100 w-full flex justify-between">
                <button className="px-4 p-2 m-2 bg-indigo-100 border border-gray-200 text-xl text-indigo-700
                rounded-md shadow-md hover:bg-indigo-700 hover:text-indigo-50"> Archives
                </button>
                <p className="text-5xl text-center w-full m-2 px-4 text-gray-600 ">EOD Report</p>
                <button className="px-4 p-2 m-2 bg-indigo-100 border border-gray-200 text-xl text-indigo-700
                rounded-md shadow-md hover:bg-indigo-700 hover:text-indigo-50"> Calendar
                </button>
            </div>
        )
    }

    const report_title = () => {
        return (
            <div className="p-4 flex justify-between ">
                <p className="p-2 text-xl tracking-tight text-gray-500">Location: <span
                    className="text-gray-800 ">Plano </span></p>
                <p className="p-2 text-xl tracking-tight text-gray-500">Report Date: <span
                    className="text-gray-800 ">Dec 03, 2023 </span></p>
            </div>
        )
    }

  return (
      <div className="container mx-auto p-4 bg-50 my-2 max-h-screen">
          { toolbar() }
          { report_title() }
          <MastersList/>
      </div>
  )
}
export default App;
