import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzaState } from "../../types/redux";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (categoryId: number | null) => {
        const { data } = await axios.get(
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
                console.log('Загрузка пицц...');
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state: IPizzaState, action: any) => {
                state.status = 'success';
                console.log('Пиццы успешно загружены');
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state: IPizzaState) => {
                state.status = 'error';
                state.items = [];
                console.log('Ошибка при загрузке пицц');
            })
    }
})

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer
