import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const URL = "http://localhost:8000";

export const fetchEodData = createAsyncThunk("eod/fetchEodData", async ()=>{
    const response = await axios.get(`${URL}/eod/api/list?format=json`, {
                        header: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }});
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
/*
{
    "location": 9,
    "shift": "AM Shift",
    "traffic_status": "Busy",
    "shift_lead": "Nina",
    "location_cleaned_status": "Facility Cleaned",
    "games_sold": 2,
    "walkins_declined": 1,
    "inventory_reorder": "Nothing to order",
    "eod_notes": "<p><span style=\"background-color: rgb(0, 0, 0); color: rgb(136, 136, 136);\">In the AM shift, we had no booking and it was a slow day, Nina did her daily cleaning. She followed up with some customers and booked a birthday party. She also set up an interview with a candidate on Thursday and helped Trey with some job inquiries as well as talked to him about setting up a meeting for next week for the PH implementation. She then printed off some flyers that she'll be handing out to business soon! In the PM shift we had a 3 room corporate event that went well! Anastasia and Zoie both came in to help so that was appreciated. Unfortunately when Zoie was resetting the Penthouse, she made two mistakes that affected the gameflow substantially of the next game, the customers didn't seem extremely upset but they did ask if there was any compensation they could get. Fortunately I had let Holly and Nina know as soon as it happened, and she approved 15% off if they asked so I had it on standby in case. I also started feeling pretty sick towards the end of the night, I did ask Nina if I could block off the rest of the last round since it was about the blocked off 30 minutes after that message. Unfortunately a single second before Nina said yes, we got an 8:15pm(our latest) it was really unfortunate but I took an ibuprofen and ate some pretzels and it subsided a few of the symptoms a little bit. Nina said it was alright if we left right after the game ended which I was very grateful for. Nina was also looking for approval to purchase replacement lollipops for Empire City since a couple of pretty broken. Also, Holly, both Nina and I have asked Adam about his availability, and he hasn't responded, can you step in and see when he's available next? The status of the rooms are:</span></p>"
}
 */
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
        // console.log("Got this data to post ... ",form);

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
