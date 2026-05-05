import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        setCategory: (state, action) => {
            state.categoryId = action.payload
        }
    }
})

export const {setCategory} = filterSlice.actions
export default filterSlice.reducer
