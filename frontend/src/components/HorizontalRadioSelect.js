import React, {useState} from "react";

/**
 *
 * @param onSelect
 * @param selectOptions { [label, value]}
 * @param defaultValue
 * @returns {JSX.Element}
 * @constructor
 */
const HorizontalRadioSelect = ({onSelect, selectOptions, defaultValue=null}) => {
    const [selected, setSelected ] = useState(defaultValue);
    let option_buttons = selectOptions.map((option) => {
        const bg_style = (option.value === selected) ? ' bg-blue-500 ': ` bg-gray-50 `
        const txt_style = (option.value === selected) ? ' text-blue-50 ': ` text-gray-500 `
        return (
            <div key={option.value}
                 onClick={()=>{
                     setSelected(option.value)
                     onSelect(option.value)
                 }}
                 className={`p-1 ${bg_style} border border-gray-100 rounded-md hover:bg-indigo-500 `
                            + `text-md ${txt_style} tracking-tight text-center hover:text-indigo-50 `}>
                {option.label}
            </div>
        )
    })
    return (
        <div className={`grid grid-cols-${selectOptions.length} p-1 bg-white border border-gray-100 m-1 shadow-sm`}>
            {option_buttons}
        </div>
    );
}

export {HorizontalRadioSelect}
