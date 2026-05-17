import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice.ts";
import cart from './slices/cartSlice.ts'
import pizza from './slices/pizzaSlice.ts'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    },
})