import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000";
const header = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
    };

export const fetchEodData = createAsyncThunk("eod/fetchEodData", async ()=>{
    const response = await axios.get(`${URL}/eod/api/list?format=json`, 
            { header: { "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" }, });
    return response.data;
});

export const postEodData= createAsyncThunk("eod/postEodData", 
    async (formData)=>{
        console.log("Got this data to post ... ", formData);
        let data = await axios.post(`${URL}/eod/api/list`, 
                            formData, 
                            { 
                                header: { "Content-Type": "application/json", 
                                          "Access-Control-Allow-Origin": "*" 
                                        }, 
                            });
        return data;
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
            state.error = action.error.message;
            state.status = "Failed";
        })
    }
});

export default eodSlice.reducer;