import { configureStore,ThunkAction, Action } from "@reduxjs/toolkit"
import itemsReducer from "../features/itemsSlice"
import cartReducer from "../features/cartSlice"


export const store = configureStore({
    reducer: {
      items: itemsReducer,
      cart:  cartReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;