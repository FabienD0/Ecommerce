import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { URL } from "../../App";

const initialState = {
    items: [],
    latestItems: [],
    oneItem: [],
    isLoading: true,
}

/* Get All Items */
export const getItems = createAsyncThunk(
  '/getAllItems',
  async () => {
    const response = await fetch(`${URL}/getAllItems`);
    const data = await response.json();
    return data.rows;
  }
);

/* Get Latest Items */
export const getLatestItems = createAsyncThunk(
  '/getLatestItems',
  async () => {
    const response = await fetch(`${URL}/getLatestItems`);
    const data = await response.json();
    return data.rows;
  }
);

/* Get One Item */
export const getOneItem = createAsyncThunk(
  '/getOneItem',
  async (productId: string | undefined, thunkAPI) => {
    const response = await fetch(`${URL}/getOneItem/${productId}`);
    const data = await response.json();
    return data.rows;
  }
);


const itemsSlice = createSlice({
    name: "Items",
    initialState,
    reducers: {
    },
    extraReducers: {
      //Get All Items
        [`${getItems.pending}`]: (state) => {
            state.isLoading = true;
          },
          [`${getItems.fulfilled}`]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.items = action.payload;
          },
          [`${getItems.rejected}`]: (state) => {
            state.isLoading = false;
          },
        //Get Latest Items
          [`${getLatestItems.pending}`]: (state) => {
            state.isLoading = true;
          },
          [`${getLatestItems.fulfilled}`]: (state, action) => {
            state.isLoading = false;
            state.latestItems = action.payload;
          },
          [`${getLatestItems.rejected}`]: (state) => {
            state.isLoading = false;
          },
        //Get One Item
        [`${getOneItem.pending}`]: (state) => {
          state.isLoading = true;
        },
        [`${getOneItem.fulfilled}`]: (state, action) => {
          state.isLoading = false;
          state.oneItem = action.payload;
        },
        [`${getOneItem.rejected}`]: (state) => {
          state.isLoading = false;
        },
    }
})


export default itemsSlice.reducer;