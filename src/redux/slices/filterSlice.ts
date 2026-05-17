import {createSlice} from "@reduxjs/toolkit";
import {IFilterState} from "../../types/redux";

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
        setCategory: (state: IFilterState, action: { payload: number }) => {
            state.categoryId = action.payload
        }
    }
})

export const {setCategory} = filterSlice.actions
export default filterSlice.reducer
