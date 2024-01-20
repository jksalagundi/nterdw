import React from "react";
import accounting from "accounting-js";

const Nugget = ({icon_name, text, stats, percent, prev_stat, icon_color = 'text-gray-400'}) => {
    const nugget_style = "flex-col justify-between w-1/4 h-32 p-3 justify-center items-center" +
        "bg-gray-50 border border-indigo-50 shadow-md rounded-md mx-3";
    const icon_style = "w-auto self-center material-symbols-outlined  " + icon_color + " text-4xl py-2 px-2 " +
        " rounded-md border-gray-100 ";
    const up_flag = percent > 0;
    const percent_text = (up_flag) ? accounting.toFixed(percent * 100, 0) : accounting.toFixed(percent * -100.0, 0);
    return (
        <div className={nugget_style}>
            <div className={'flex w-full'}>
                <p className={'w-full text-xl text-gray-500 tracking-tight text-center mb-2 border-b border-indigo-200'}>
                    {`${text} is `}
                    <span className={`${up_flag ? "text-green-500" : "text-red-500"}`}>
                        {up_flag ? " up " : " down "} {` ${percent_text} %`}
                    </span>
                </p>
            </div>
            <div className={'flex w-full justify-evenly'}>
                <span className={icon_style}>{icon_name}</span>
                <p className={'self-center text-gray-700 text-3xl text-left mx-2 px-2 font-light tracking-tight'}>
                    {stats}
                </p>
                <p className={'self-center text-gray-500 text-xl text-left mx-2 px-2 font-light tracking-tighter'}>
                    {`(${prev_stat})`}
                </p>
            </div>
        </div>
    )
}

export {Nugget}
