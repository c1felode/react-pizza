export enum PizzaSizes {
  SMALL = "25",
  MEDIUM = "30",
  LARGE = "35"
}

export enum PizzaTypes {
    THIN = "тонкое",
    THICK = "традиционное"
}


export type TCartItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  title: string;
  types: PizzaTypes[];
  sizes: PizzaSizes[];
  price: number;
};

export type TPizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  sizes: PizzaSizes[];
  price: number;
  types: PizzaTypes[];
};

export type TCartItemProps = {
  id: number;
  title: string;
  types: PizzaTypes[];
  price: number;
  imageUrl: string;
  count: number;
  sizes: PizzaSizes[];
};
