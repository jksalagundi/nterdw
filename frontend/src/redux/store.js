import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import filterReducer from './features/filters/filterSlicer';
import ordersReducer from "./features/orders/ordersSlice";
import {logger} from "redux-logger/src";

export default configureStore({
    reducer: {
        filter: filterReducer,
        orders: ordersReducer,
    },
    // middleware: applyMiddleware(logger),
});
