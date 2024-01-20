
import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchMasters, selectAllLocations} from "../../redux/mastersSlice";

const MastersList = () => {
    const dispatch = useDispatch();
    const masters = useSelector(fetchMasters);

    const masterStatus = useSelector((state) => state.masters.status);
    const error = useSelector((state) => state.masters.error);

    useEffect(() => {
        if (masterStatus === 'idle') {
            dispatch(fetchMasters());
        }
    }, [masterStatus, dispatch]);

    // if (orderStatus === 'succeeded' && orders.length > 0) {
    //     return (
    //         <div className={'w-full w-64 justify-items-center align-middle'}>
    //             <h1> Orders Count Retrieved : {orders.length}</h1>
    //             <p> Booking ID Sample: {orders[0].booking_id}</p>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className={'w-full p-3 bg-indigo-500'}>
    //             <h1> Working !! </h1>
    //             <p> Order Status - {orderStatus}</p>
    //             {(error) ? <p>{error}</p> : <p>No error occurred</p>}
    //         </div>
    //     )
    // }
    return (
        <div>
            <p>Masters retrieved # {masters.length}</p>
        </div>
    )

}
export {MastersList}
