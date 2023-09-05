import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { URL } from "../../App";

const initialState = {
    items: [],
    latestItems: [],
    oneItem: [],
    itemsByName:[],
    itemsByCategory: [],
    itemsByBrands: [],
    searchStatus: 0,
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

/* Search Result */
export const getItemsByName = createAsyncThunk(
  '/getItemsByName',
  async (name: string | undefined, thunkAPI) => {
    const response = await fetch(`${URL}/getItemsByName/${name}`);
    const data = await response.json();
    return data;
  }
);

/* Get Items by Category */
export const getItemsByCategory = createAsyncThunk(
  '/getItemsByCategory',
  async (category: string | undefined, thunkAPI) => {
    const response = await fetch(`${URL}/getItemsByCategory/${category}`);
    const data = await response.json();
    return data.rows;
  }
);

/* Get Items by Brands */
export const getItemsByBrands = createAsyncThunk(
  '/getItemsByBrands',
  async (brand: string | undefined, thunkAPI) => {
    const response = await fetch(`${URL}/getItemsByBrands/${brand}`);
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
        //Get Item By Name
        [`${getItemsByName.pending}`]: (state) => {
          state.isLoading = true;
        },
        [`${getItemsByName.fulfilled}`]: (state, action) => {
          state.isLoading = false;
          state.itemsByName = action.payload.rows;
          state.searchStatus = action.payload.status;
        },
        [`${getItemsByName.rejected}`]: (state) => {
          state.isLoading = false;
        },
        //Get Item By Category
        [`${getItemsByCategory.pending}`]: (state) => {
          state.isLoading = true;
          },
        [`${getItemsByCategory.fulfilled}`]: (state, action) => {
          state.isLoading = false;
          state.itemsByCategory = action.payload;
        },
        [`${getItemsByCategory.rejected}`]: (state) => {
          state.isLoading = false;
        },
        //Get Item By Brands
        [`${getItemsByBrands.pending}`]: (state) => {
          state.isLoading = true;
          },
        [`${getItemsByBrands.fulfilled}`]: (state, action) => {
          state.isLoading = false;
          state.itemsByBrands = action.payload;
        },
        [`${getItemsByBrands.rejected}`]: (state) => {
           state.isLoading = false;
        },
    }
})


export default itemsSlice.reducer;