import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    status: 'idle',
    error: null
}

const URL = "";
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {

    const response = await axios.get(`${URL}/orders`, {
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
    return response.data;
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** TODO **
 * Need to generate this list from server
 * @type {string[]}
 */
const GAMES = [
    "aunt-carolyn-closet",
     'amnesia',
     'principals-office',
     'submerged',
     'plano-penthouse',
     'mckinney-penthouse',
     'jailhouse',
     'summer-camp',
     'killers-campground',
     'empire-city',
     'dragons-curse',
     'others',
];

const get_quarter = (ad) => {
    if (ad.getMonth() < 3) {
        return 'Q1'
    } else if (ad.getMonth() < 6) {
        return 'Q2'
    } else if (ad.getMonth() < 9) {
        return 'Q3'
    } else {
        return 'Q4'
    }
}

/**
 * Generate a unique game name
 * @param order
 */
const get_game_name = (order) => {
    const {listing, location} = order;
    if (listing.toLowerCase().search("aunt") !== -1) {
        return 'aunt-carolyn-closet'
    } else if (listing.toLowerCase().search("amnesia") !== -1) {
        return 'amnesia'
    } else if (listing.toLowerCase().search("principal") !== -1) {
        return 'principals-office'
    } else if (listing.toLowerCase().search("submerged") !== -1) {
        return 'submerged'
    } else if (listing.toLowerCase().search("penthouse") !== -1
        && location.toLowerCase().search("plano") !== -1) {
        return 'plano-penthouse'
    } else if (listing.toLowerCase().search("penthouse") !== -1
        && location.toLowerCase().search("mckinney")!== -1)  {
        return 'mckinney-penthouse'
    } else if (listing.toLowerCase().search("jailhouse") !== -1){
        return 'jailhouse'
    } else if (listing.toLowerCase().search("summer") !== -1){
        return 'summer-camp'
    } else if (listing.toLowerCase().search("killers") !== -1){
        return 'killers-campground'
    } else if (listing.toLowerCase().search("empire city") !== -1){
        return 'empire-city'
    } else if (listing.toLowerCase().search("dragon") !== -1){
        return 'dragons-curse'
    } else {
        return 'others'
    }
}
const pre_process_orders = (orders) => {
    if (orders) {
        return orders.map((order) => {
            let arv_date = new Date(order.arrival_date);
            let month_label = arv_date.getMonth() < 9 ? `0${arv_date.getMonth() + 1}` : `${arv_date.getMonth() + 1}`;

            return {
                ...order,
                arrival_dt: arv_date,
                booking_dt: new Date(order.booking_date),
                arrival_month: `${MONTHS[arv_date.getMonth()]}-${arv_date.getFullYear()}`,
                arrival_month_number: `${arv_date.getFullYear()}-${month_label}`,
                arrival_qtr_year: `${arv_date.getFullYear()}-${get_quarter(arv_date)}`,
                arrival_qtr: `${get_quarter(arv_date)}`,
                arrival_year: `FY-${arv_date.getFullYear()}`,
                game: get_game_name(order),
            }
        });
    }
    return null;
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orders = pre_process_orders(action.payload)
                console.log("Sample Pre-processed order : ", state.orders[0]);
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
});

export default ordersSlice.reducer;
export const selectAllOrders = (state) => state.orders.orders
export const allGames = GAMES;
