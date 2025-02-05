import { StateCreator } from "zustand";
import { IBoundStore, IMutators } from "./store";
import { ERROR_STATUS } from "@/utils/errors/errors";

type ICartItem = {
  cartId: string;
  productCode: string;
  size: string;
  quantity: number;
};

const CART_INITIAL_STATE = {
  totalCartItem: null,
  cartItems: [],
};

type ICartState = {
  totalCartItem: null | number;
  cartItems: ICartItem[];
};

type ICartAction = {
  addToCart(item: ICartItem): ERROR_STATUS | -1;
  updateCart(productCode: string, quantity?: number, size?: string): void;
  deleteCartItem(productCode: string): void;
};

export type ICartStore = ICartAction & ICartState;

export const cartStore: StateCreator<IBoundStore, IMutators, [], ICartStore> = (
  set,
  get
) => ({
  ...CART_INITIAL_STATE,
  updateCart(productCode, quantity, size) {
    set((state) => {
      const index = state.cartItems.findIndex(
        (e: ICartItem) => e.productCode === productCode
      );

      if (index !== -1) {
        if (quantity) {
          state.cartItems[index].quantity = quantity;
        }
        if (size) {
          state.cartItems[index].size = size;
        }
      }
    });
  },
  deleteCartItem(productCode) {
    set((state) => {
      const index = state.cartItems.findIndex(
        (e: ICartItem) => e.productCode === productCode
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        return state;
      }
    });
  },
  addToCart(item) {
    const index = get().cartItems.findIndex(
      (e: ICartItem) => e.productCode === item.productCode
    );
    if (index === -1) {
      set((state) => {
        state.cartItems.push(item);
        return state;
      });
      return -1;
    } else {
      return ERROR_STATUS.ALREADY_EXIST;
    }
  },
});
