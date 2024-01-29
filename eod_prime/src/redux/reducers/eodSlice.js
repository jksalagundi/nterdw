import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "./util";

const initialState = {
    status: null,
    error: null,
    eod_reports: []
}
const URL = "http://localhost:8000";

export const fetchEodData = createAsyncThunk("eod/fetchEodData", async () => {
    const response = await axios.get(`${URL}/eod/api/list?format=json`, {
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
    return response.data;
});

export const postEodData = createAsyncThunk("eod/postEodData",
    async (formData) => {
        axios.defaults.withCredentials = true;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = getCookie('csrftoken');
        let url = "http://localhost:8000/eod/api/list";
        let method = "post";
        if (formData) {
            const resend_status = formData.get("resend_status");
            const existing_form_id = formData.get("existing_form_id");
            console.log("Resend Status, Existing ID", resend_status, existing_form_id);
            if (resend_status === "true") {
                url = `http://localhost:8000/eod/api/${existing_form_id}/`;
                method = "put";
            }
        }
        console.log("URL Used for posting ... ", url);
        const response = await axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                // 'Content-Type': 'application/json' 
            },
        });
        return response.data;

    });

export const sendEmail = createAsyncThunk("eod/sendEmail", async (data) => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = getCookie('csrftoken');
    let url = `http://localhost:8000/eod/api/emails/${data.location}/${data.report_date}/${data.shift}/`;
    const response = await axios({
        method: 'get',
        url: url,
        headers: {
            // "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
    });
    return response.data;
});

const eodSlice = createSlice({
    name: 'eod',
    initialState,
    reducers: {},
    extraReducers(builder) {
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
                state.error = action.error;
                state.status = "Failed";
                console.log("Form Posting failed", action.payload);
            }).addCase(sendEmail.pending, (state, action) => {
                state.status = "Email Pending"
            }).addCase(sendEmail.fulfilled, (state, action) => {
                state.status = "Email Sent"
                console.log("Sent ... ", action.payload);
            }).addCase(sendEmail.rejected, (state, action) => {
                state.status = "Failed to send emails"
                state.error = action.error;
            })
    }
});

export default eodSlice.reducer;
