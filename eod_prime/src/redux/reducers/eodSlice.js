import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie} from "./util";

const URL = "http://localhost:8000";

export const fetchEodData = createAsyncThunk("eod/fetchEodData", async ()=>{
    const response = await axios.get(`${URL}/eod/api/list?format=json`, {
                        header: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }});
    return response.data;
});

const buildFormData = (data) => {
    let form = new FormData();
    form.append("location", data.location);
    form.append("shift", data.shift.substring(0,2));
    form.append("shift_lead", data.shift_lead);
    form.append("games_sold", data.games_sold);
    form.append("location_cleaned_status", data.location_cleaned_status);
    form.append("traffic_status", data.traffic_status);
    form.append("walkins_declined", data.walkins_declined);
    form.append("eod_notes", data.eod_notes);
    form.append("inventory_reorder", data.inventory_reorder);
    return form;
}

export const postEodData= createAsyncThunk("eod/postEodData",
    async (formData)=>{
        axios.defaults.withCredentials = true;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = getCookie('csrftoken');
        let form = buildFormData(formData);

        const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/eod/api/list',
                data: form,
                headers: { "Content-Type": "multipart/form-data"},
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
        }).addCase(postEodData.pending, (state, action) => {
            state.status = "Posting";
        }).addCase(postEodData.fulfilled, (state, action) => {
            state.status = "Posted"
            state.eod_reports = action.payload;
        }).addCase(postEodData.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "Failed";
            console.log("Form Posting failed", action.payload);
        })
    }
});

export default eodSlice.reducer;
