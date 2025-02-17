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
  totalCartItem: 0,
  cartItems: [],
};

type ICartState = {
  totalCartItem: number;
  cartItems: ICartItem[];
};

type ICartAction = {
  addToCart(item: ICartItem): ERROR_STATUS | -1;
  updateCart(payload: {
    cartId: string;
    quantity?: number;
    size?: string;
  }): void;
  deleteCartItem(cartId: string): void;
  setTotalCartItem(n: number): void;
};

export type ICartStore = ICartAction & ICartState;

export const cartStore: StateCreator<IBoundStore, IMutators, [], ICartStore> = (
  set,
  get
) => ({
  ...CART_INITIAL_STATE,
  updateCart({ cartId, quantity, size }) {
    set((state) => {
      const index = state.cartItems.findIndex(
        (e: ICartItem) => e.cartId === cartId
      );

      if (index !== -1) {
        if (quantity) {
          const curCartItem = state.cartItems[index];
          let totalCartItem = state.totalCartItem;
          totalCartItem -= curCartItem.quantity;
          state.setTotalCartItem( totalCartItem + quantity)

          state.cartItems[index].quantity = quantity;
        }
        if (size) {
          state.cartItems[index].size = size;
        }
      }
    });
  },
  deleteCartItem(cartId) {
    set((state) => {
      const index = state.cartItems.findIndex(
        (e: ICartItem) => e.cartId === cartId
      );
      if (index !== -1) {
        const curCartItem = state.cartItems[index];
        const total = state.totalCartItem  - curCartItem.quantity
        state.setTotalCartItem(total)

        state.cartItems.splice(index, 1);
        return state;
      }
    });
  },
  addToCart(item) {
    const index = get().cartItems.findIndex(
      (e: ICartItem) =>
        e.productCode === item.productCode && e.size === item.size
    );
    if (index === -1) {
      set((state) => {
        state.cartItems.push(item);
        state.totalCartItem += 1;
        return state;
      });
      return -1;
    } else {
      return ERROR_STATUS.ALREADY_EXIST;
    }
  },
  setTotalCartItem(n) {
    if (n < 0) n = 0;
    set({ totalCartItem: n });
  },
});
