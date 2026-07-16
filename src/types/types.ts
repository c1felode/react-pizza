export type TCartItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

export type TPizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
};

export type TCartItemProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  imageUrl: string;
  count: number;
  size: number;
};
