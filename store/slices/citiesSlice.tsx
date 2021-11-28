import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "../../src/storage/storage";

import mockedCities from "./../../src/mockUps/favouriteCities";

interface City {
  name: string;
  temperature: DoubleRange;
}
/*
  On the first call of the App we look for the localStorage if there's some 
  city favourite's saved.
*/
const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    data: mockedCities,
    status: "idle",
  },
  reducers: {
    addCity(state, action: PayloadAction<string>) {
      state.data = state.data.push(action.payload);
    },
    removeCity(state, action: PayloadAction<string>) {
      state.data = state.data.filter(city => city.id === action.payload)
    }
  }
})

export const { addCity, removeCity } = citiesSlice.actions;

export default citiesSlice.reducer;