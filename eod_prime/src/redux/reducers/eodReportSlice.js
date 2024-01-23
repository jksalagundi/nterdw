import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    eod_reports: [],
    status: "",
    error: "",
}

const URL = "http://localhost:8000";

const fetchEODReports = createAsyncThunk('eodReport/fetchEODReports', async () => {
    const response = await axios.get(`${URL}/eod/api/list?format=json`, {
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
    return response.data;
});

const eodReportSlice = createSlice({
    name: 'eodReport',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchEODReports.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEODReports.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (action.payload) {
                    state.eod_reports = action.payload;
                }
            })
            .addCase(fetchEODReports.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
});

export default eodReportSlice.reducer;