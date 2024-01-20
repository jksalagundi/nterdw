import {createSlice} from "@reduxjs/toolkit";

const InitialState = {
    location: 'all',
    time_series: 'month',
    game: 'all',
    chart_type: 'revenue',
}

export const filterSlicer = createSlice({
    name: 'filter',
    initialState: InitialState,
    reducers: {
        changeFilterLocation: (state, action) => {
            state.location = action.payload;
        },
        changeFilterTimeSeries: (state, action) => {
            state.time_series = action.payload;
        },
        changeFilterGame: (state, action) => {
            state.game = action.payload;
        },
        changeFilterChartType: (state, action) => {
            state.chart_type = action.payload;
        }
    }
});

export const {
    changeFilterTimeSeries,
    changeFilterGame,
    changeFilterLocation,
    changeFilterChartType
} = filterSlicer.actions;
export default filterSlicer.reducer;
