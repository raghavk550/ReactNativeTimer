import { combineSlices, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice(
    {
        name : 'counter',
        initialState : {
            value : 0
        },
        reducers : {
            increment : (state) => {
                state.value += 1;
            },
            decrement : (state) => {
                state.value -= 1;
            },
        },
    }
);

export const colorSlice = createSlice(
    {
        name : 'bkColor',
        initialState : {
            color : "red"
        },
        reducers : {
            changeToYellow : (state) => {
                state.color = "yellow";
            },
            changeToWhite : (state) => {
                state.color = "white";
            },
        },
    }
);

export const { increment, decrement } = counterSlice.actions;

export const { changeToWhite, changeToYellow } = colorSlice.actions;

export const selectCount = (state) => state.counter.value;

export const selectColor = (state) => state.bkColor.color;

// export default counterSlice.reducer;

// export const colorReducer = ColorSlice.reducer;

const myCombineSlice = combineSlices(counterSlice, colorSlice);

export default myCombineSlice;