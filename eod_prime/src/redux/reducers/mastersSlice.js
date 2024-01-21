import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    locations: [],
    status: "",
    error: "",
}

const URL = "http://localhost:8000";
export const fetchMasters = createAsyncThunk('masters/fetchMasters', async () => {
    const response = await axios.get(`${URL}/masters/locations`, {
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
    return response.data;
});

const mastersSlice = createSlice({
    name: 'masters',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMasters.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMasters.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.locations = action.payload
            })
            .addCase(fetchMasters.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
});

export default mastersSlice.reducer;
export const selectAllLocations = (state) => state.locations;
// export const selectAllOrders = (state) => state.orders.orders
