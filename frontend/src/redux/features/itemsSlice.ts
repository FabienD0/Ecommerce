import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    isLoading: true,
}

// export const getItems = createAsyncThunk("items/getItems", async () => {
//     const response = await fetch("/getAllItems");
//     const data = await response.json();
//     return data.data;
// });

export const getItems = createAsyncThunk(
  '/getAllItems',
  async () => {
    const response = await fetch("http://localhost:1111/getAllItems");
    const data = await response.json();
    // The value we return becomes the `fulfilled` action payload
    console.log(data)
    return data.data;
  }
);

const itemsSlice = createSlice({
    name: "Items",
    initialState,
    reducers: {
       addItem: (state,action) => {
        console.log(state)
        console.log("Here")
        console.log(action)
       } 
    },
    extraReducers: {
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
    }
})

export const { addItem } = itemsSlice.actions;

export default itemsSlice.reducer;