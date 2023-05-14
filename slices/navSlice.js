import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    rideScreen: null,
    travelDate: new Date().getTime(),
    travelTimeInformation: null,
    currentUser: {
        userAuthenticationInfo: null,
        isLoggedIn: false,
        token: null
    }
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
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

export const { 
    setOrigin, 
    setDestination,
    setRideScreen,
    setTravelDate, 
    setTravelTimeInformation,
    setCurrentUser 
} = navSlice.actions;

//////////////////////Selectors////////////////////////
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectRideScreen = (state) => state.nav.rideScreen;
export const selectTravelDate = (state) => state.nav.travelDate;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectCurrentUser = (state) => state.nav.currentUser;

export default navSlice.reducer;