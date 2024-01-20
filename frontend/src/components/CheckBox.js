import React, {useState} from "react";

const icon_style =  "material-symbols-outlined text-gray-500 text-xl self-center cursor-pointer hover:text-indigo-500";
const checked = "check_box";
const unchecked = "check_box_outline_blank";

const CheckBox = ({onChange, defaultValue=false, title='CheckBox' }) => {
    const [checkValue, setCheckValue] = useState(defaultValue);
    return (
        <div className={'w-auto flex justify-start mx-1 p-1'}>
            <span className={icon_style} onClick={()=>{
                setCheckValue(!checkValue)
                onChange(!checkValue)
            }}>
                {`${checkValue ? checked : unchecked}`}</span>
            <span className={'text-md text-gray-500 tracking-tighter px-2'}>{title}</span>
        </div>
    )
}

export {CheckBox}
