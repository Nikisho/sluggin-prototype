import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    rideScreen: null,
    travelDate: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setRideScreen : (state, action) => {
            state.rideScreen = action.payload;
        },
        setTravelDate: (state, action) => {
            state.travelDate = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const { 
    setOrigin, 
    setDestination,
    setRideScreen,
    setTravelDate, 
    setTravelTimeInformation 
} = navSlice.actions;

//Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectRideScreen = (state) => state.nav.rideScreen;
export const selectTravelDate = (state) => state.nav.travelDate;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;