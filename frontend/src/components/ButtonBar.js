import React from "react";

const Buttons = [
    { label: 'Previous', icon: 'chevron_left', value: 'previous' },
    { label: 'Next', icon: 'chevron_right ', value: 'next' },
    { label: 'Zoom In', icon: 'add', value: 'increase' },
    { label: 'Zoom Out', icon: 'remove', value: 'decrease' },
];

export const ButtonBar = ({onClick}) => {
    const button_style = 'bg-gray-50 w-full material-symbols-outlined p-1 text-2xl text-gray-500 ' +
        ' border border-gray-100 rounded-md hover:text-indigo-50 hover:bg-indigo-500 text-center ' +
        ' cursor-pointer self-center ';
    const buttons = Buttons.map((button) => {
        return (
            <div key={`${button.icon}-button`}
                 onClick={()=>{onClick(button.value)}}
                 className={button_style}>
                {button.icon}
            </div>
        )
    })
    return (
        <div className={'w-full flex '}>
            {buttons}
        </div>
    )
}
