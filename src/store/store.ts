import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { profileReducer } from "./modules/profileSlice"; // Import your reducer
import { productsReducer } from "./modules";
import { contactsReducer } from "./modules/contactsSlice";

const store = configureStore({
  reducer: {
    user: profileReducer,
    products: productsReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
