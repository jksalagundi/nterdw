import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectAllOrders, fetchOrders} from "../../redux/features/orders/ordersSlice";

const OrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);

    const orderStatus = useSelector((state) => state.orders.status);
    const error = useSelector((state) => state.orders.error);

    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrders());
        }
    });
    // }, [orderStatus, dispatch]);

    if (orderStatus === 'succeeded' && orders.length > 0) {
        return (
            <div className={'w-full w-64 justify-items-center align-middle'}>
                <h1> Orders Count Retrieved : {orders.length}</h1>
                <p> Booking ID Sample: {orders[0].booking_id}</p>
            </div>
        );
    } else {
        return (
            <div className={'w-full p-3 bg-indigo-500'}>
                <h1> Working !! </h1>
                <p> Order Status - {orderStatus}</p>
                {(error) ? <p>{error}</p> : <p>No error occurred</p>}
            </div>
        )
    }

}
export {OrdersList}
