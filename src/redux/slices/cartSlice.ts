import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartState} from "../../types/redux";
import { RootState } from "../store";
import { TCartItem } from "../../types/types";

const initialState: ICartState = {
    totalCount: 0,
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.items.find((obj: TCartItem) => obj.id == action.payload.id);
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum: any, obj: any) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.items.find((obj: TCartItem) => obj.id == action.payload.id);
            if (findItem && findItem.count > 1) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum: any, obj: any) => {
                    return (obj.price * obj.count) + sum;
                }, 0)
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj: TCartItem) => obj.id != action.payload)
            state.totalPrice = state.items.reduce((sum: any, obj: any) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        clearCart: (state) => {
            state.items = []
            state.totalPrice = 0
        }
            
    }
})


export const selectorCartItems = (state: RootState) => state.cart.items
export const selectorCart = (state: RootState) => state.cart

export const {addItem, removeItem, clearCart, minusItem} = cartSlice.actions
export default cartSlice.reducer
