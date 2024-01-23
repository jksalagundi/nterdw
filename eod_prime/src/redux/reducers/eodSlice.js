import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000";
export const fetchEodData = createAsyncThunk("eod/fetchEodData", async ()=>{
    const response = await axios.get(`${URL}/eod/api/list?format=json`, {
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
    return response.data;
});

const initialState = {
   status: null,
   error: null,
   eod_reports: []
}

const eodSlice = createSlice({
    name: 'eod',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchEodData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchEodData.fulfilled, (state, action) => {
            state.eod_reports = action.payload;
            state.status = null;
            state.error = null;
        })
        .addCase(fetchEodData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        })
    }
});

export default eodSlice.reducer;