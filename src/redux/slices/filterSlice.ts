import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilterState} from "../../types/redux";
import { RootState } from "../store";

const initialState: IFilterState = {
    categoryId: 0,
    sort: {
        name: "популярности",
        sortProperty: "rating"
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        }
    }
})

export const selectFilterCategory = (state: RootState) => state.filter.categoryId

export const {setCategory} = filterSlice.actions
export default filterSlice.reducer
