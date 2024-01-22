import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
    selectedLocation: null,
    eod_report_header : {},
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
        updateHeader : (state, action) => {
            state.eod_report_header = _.cloneDeep(action.payload)
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

export const {changeLocation, updateHeader, updateNotes, updateDetails, initiateGameStatus} = formSlice.actions;
export default formSlice.reducer;
