import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: [
        {name: "McKinney", value: "mckinney"},
        {name: "Plano", value: "plano"},
    ],
    selectedLocation: null,
    games: [
        {location: 'mckinney', game: 'Aunt Carols Closet', code: 'ACC'},
        {location: 'mckinney', game: 'Principals Office', code: 'PRO'},
        {location: 'mckinney', game: 'Amensia', code: 'AMN'},
        {location: 'mckinney', game: 'Penthouse', code: 'MPN'},
        {location: 'mckinney', game: 'Submerged', code: 'SUB'},
        {location: 'plano', game: 'Penthouse', code: 'PPN'},
        {location: 'plano', game: 'Summer Campground', code: 'SUM'},
        {location: 'plano', game: 'Killers Campground', code: 'KLC'},
        {location: 'plano', game: 'Empire City', code: 'EMP'},
        {location: 'plano', game: 'Dragons Curse', code: 'DRG'},
        {location: 'plano', game: 'Jailhouse', code: 'JLH'},
    ],
    selectedGame: null,
};

const mastersSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        changeLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },
        changeGame: (state, action) => {
            state.selectedGame = action.payload;
        },
    }
});

export const { changeLocation, changeGame } = mastersSlice.actions;
export default mastersSlice.reducer;
