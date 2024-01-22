import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
    selectedLocation: null,
    eod_report_header : {
        shift: "AM",
        traffic_status: "",
        shift_lead: "",
        location_cleaned_status: "",
        games_sold: 0,
        cash_in_box: 0,
        walkins_declined: 0,
        inventory_reorder: ''
    },
    eod_report_details: [],
    eod_notes: null
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        initiateGameStatus: (state, action) => {
            if (action.payload && action.payload.games) {
                let entries = [];
                action.payload.games.map((game) => {
                    if (game.location === action.payload.selectedLocation.id)
                        entries.push({id: game.id, status: 'Good', details: null, location: game.location});
                })
                state.eod_report_details = entries;
            }
        },
        changeLocation : (state, action) => {
            state.selectedLocation = action.payload;
        },
        updateHeaderLeft : (state, action) => {
            let payload = action.payload;
            state.eod_report_header.shift = payload.shift;
            state.eod_report_header.shift_lead = payload.shift_lead;
            state.eod_report_header.cash_in_box= payload.cash_in_box;
            state.eod_report_header.games_sold = payload.games_sold;
        },
        updateHeaderRight : (state, action) => {
            let payload = action.payload;
            state.eod_report_header.traffic_status = payload.traffic_status;
            state.eod_report_header.location_cleaned_status = payload.location_cleaned_status;
            state.eod_report_header.walkins_declined = payload.walkins_declined;
            state.eod_report_header.inventory_reorder = payload.inventory_reorder;
        },
        updateDetails : (state, action) => {
            if (state.eod_report_details && state.eod_report_details.length > 0){
                let game = action.payload;
                state.eod_report_details = state.eod_report_details.map((g) => {
                   return (g.id === game.id) ? action.payload : g
                })
            }
        },
        updateNotes : (state, action) => {
            state.eod_notes = _.cloneDeep(action.payload)
        }
    }
});

export const {changeLocation, updateNotes, updateHeaderLeft, updateHeaderRight,
                updateDetails, initiateGameStatus} = formSlice.actions;
export default formSlice.reducer;
