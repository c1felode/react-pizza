import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzaState } from "../../types/redux";
import { TCartItem } from "../../types/types";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<TCartItem[], number | null>(
    'pizza/fetchPizzasStatus',
    async (categoryId) => {
        const { data } = await axios.get<TCartItem[]>(
            `https://69ef40f0112e1b968e2443fa.mockapi.io/items?category=${!categoryId ? '' : categoryId}`,
        );
        return data;
    }
)

const initialState: IPizzaState = {
    items: [],
    status: 'loading',
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state: IPizzaState, action: any) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state: IPizzaState) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state: IPizzaState, action: PayloadAction<TCartItem[]>) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state: IPizzaState) => {
                state.status = 'error';
                state.items = [];
            })
    }
})

export const selectPizza = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer
