import {createSlice} from "@reduxjs/toolkit";
import {ICartState} from "../../types/redux";

const initialState: ICartState = {
    totalCount: 0,
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state: ICartState, action: { payload: any }): void => {
            const findItem = state.items.find((obj: any) => obj.id == action.payload.id);
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
        minusItem: (state: ICartState, action: { payload: any }): void => {
            const findItem = state.items.find((obj: any) => obj.id == action.payload.id);
            if (findItem && findItem.count > 1) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum: any, obj: any) => {
                    return (obj.price * obj.count) + sum;
                }, 0)
            }
        },
        removeItem: (state: ICartState, action: { payload: any }): void => {
            state.items = state.items.filter((obj: any) => obj.id != action.payload)
            state.totalPrice = state.items.reduce((sum: any, obj: any) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        clearCart: (state: ICartState): void => {
            state.items = []
            state.totalPrice = 0
        }
            
    }
})

export const {addItem, removeItem, clearCart, minusItem} = cartSlice.actions
export default cartSlice.reducer
