import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState } from "../../types/redux";
import { RootState } from "../store";
import { TCartItem } from "../../types/types";

const getCartFromLS = (): ICartState => {
    try {
        const data = localStorage.getItem('cart');
        const items: TCartItem[] = data ? JSON.parse(data) : [];
        
        const totalPrice = items.reduce((sum, obj) => (obj.price * (obj.count || 1)) + sum, 0);
        const totalCount = items.reduce((sum, obj) => (obj.count || 1) + sum, 0);

        return {
            items,
            totalPrice,
            totalCount
        };
    } catch (error) {
        console.error("Ошибка чтения корзины из localStorage:", error);
        return {
            items: [],
            totalPrice: 0,
            totalCount: 0
        };
    }
};

const initialState: ICartState = getCartFromLS();

const updateCartStorage = (state: ICartState) => {
    state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
    state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
    
    localStorage.setItem('cart', JSON.stringify(state.items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.items.find((obj: TCartItem) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            updateCartStorage(state);
        },
        minusItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.items.find((obj: TCartItem) => obj.id === action.payload.id);
            if (findItem && findItem.count > 1) {
                findItem.count--;
                updateCartStorage(state);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj: TCartItem) => obj.id !== action.payload);
            updateCartStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
            localStorage.removeItem('cart');
        }
    }
});

export const selectorCartItems = (state: RootState) => state.cart.items;
export const selectorCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
