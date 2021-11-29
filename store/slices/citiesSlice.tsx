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
const citiesSlice: any = createSlice({
  name: "cities",
  initialState: {
    data: [], // mockedCities
    status: "idle",
  },
  reducers: {
    getSavedCities(state, action) {
      storage.load({key: 'favCities'}).then(data => state.data = data)
    },
    addCity(state, action: PayloadAction<string>) {
      state.data = state.data.push(action.payload);
      storage.save({key: 'favCities', data: state.data})
    },
    removeCity(state, action: PayloadAction<string>) {
      state.data = state.data.filter(city => city.id === action.payload);
      storage.remove({key: action.payload})
    }
  }
})

export const { addCity, removeCity, getSavedCities } = citiesSlice.actions;

export default citiesSlice.reducer;