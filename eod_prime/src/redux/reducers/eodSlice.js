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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const postEodData= createAsyncThunk("eod/postEodData", 
    async (formData)=>{
        axios.defaults.withCredentials = true;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = getCookie('csrftoken');
        console.log("Got this data to post ... ", getCookie('csrftoken'));
        let data = await axios.post(`${URL}/eod/api/list`, 
                            JSON.stringify(formData), 
                            { 
                                header: { 
                                    "Content-Type": "application/json", 
                                    "Access-Control-Allow-Origin": "*" ,
                                    // "X-CSRFToken": getCookie('csrftoken'),
                                }, 
                            });
        return data;

        // const response = await fetch('http://localhost:8000/eod/api/list',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(formData),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //             'Access-Control-Allow-Origin': "*",
        //             "X-CSRFToken": getCookie('csrftoken'),
        //         }
        //     });
        // return response.json();
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