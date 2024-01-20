import React from "react";
import {useDispatch} from "react-redux";
import {fetchOrders} from "../../redux/features/orders/ordersSlice";
import axios from "axios";

const HOME_URL = "http://127.0.0.1:8000";

const TopMenu = ({onLogin}) => {
    const dispatch = useDispatch();

    const icon_style = "material-symbols-outlined text-gray-400 text-3xl py-2 px-4 mx-1 " +
        "bg-gray-100 rounded-md border-gray-100 hover:bg-indigo-700 hover:text-indigo-50 hover:font-bold";
    return (
        <div className={'flex justify-between w-full max-h-24 p-3 m1-2 mx-1 bg-white shadow-sm border-gray-100'}>
            <div className={'w-auto'}>
                <span className={icon_style}> home</span>
                <span className={icon_style} onClick={()=>{
                    dispatch(fetchOrders())
                }}> refresh </span>
            </div>
            <div className={'w-auto'}>
                <p className={'mt-2 text-3xl text-indigo-600 tracking-tight font-light text-center'}>NTER Business Dashboard</p>
            </div>
            <div className={'flex w-auto justify-end'}>
                <span className={icon_style}> person </span>
                <span className={icon_style}
                      onClick={()=>onLogin(false)}> logout </span>
            </div>
        </div>
    );
}

export {TopMenu}
