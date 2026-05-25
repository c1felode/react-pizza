import { TCartItem } from "./types";

export interface IPizzaState {
    items: any[],
    status: 'loading' | 'success' | 'error'
}

export interface IFilterState {
    categoryId: number;
    sort: {
        name: string;
        sortProperty: string;
    }
}

export interface ICartState {
    totalCount: number,
    totalPrice: number,
    items: TCartItem[]
}

export interface IRootState {
    pizza: IPizzaState;
    filter: IFilterState;
    cart: ICartState;
}