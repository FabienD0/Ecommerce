import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { URL } from "../../App";
import { ItemCard } from "../../components/utils/types";

/* Local Storage Code */
const cart: ItemCard[] = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems") || "") : [];
const totalQuantity : number = localStorage.getItem("totalQuantity") !== null ? JSON.parse(localStorage.getItem("totalQuantity") || "") : 0;
const totalAmount: number = localStorage.getItem("totalAmount") !== null ? JSON.parse(localStorage.getItem("totalAmount") || "") : 0;

const setItemFunc = (cartItems: ItemCard[],totalAmount: number,totalQuantity: number) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity",JSON.stringify(totalQuantity));
}


const initialState = {
    cartItems: cart,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
    isLoading: true,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    // Add Item
    addItem(state,action) {
        const newItem = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === newItem.id);
        state.totalQuantity ++;
    
    if(!existingItem) {
        state.cartItems.push({
            body_location: newItem.body_location,
            category: newItem.category,
            companyId: newItem.companyId,
            id: newItem.id,
            imageSrc: newItem.imageSrc,
            name: newItem.name,
            numInStock: newItem.numInStock,
            price: parseFloat(newItem.price.slice(1)),
            totalPrice: parseFloat(newItem.price.slice(1)),
            quantity: 1
        })
    } else {
        existingItem.quantity ++;
        existingItem.totalPrice = existingItem.totalPrice + parseFloat(newItem.price.slice(1));
    }
    state.totalAmount = state.cartItems.reduce((total,item) => total + item.totalPrice * item.quantity,0)
    setItemFunc(state.cartItems,state.totalAmount,state.totalQuantity)
    },
    //Remove Item
    removeItem(state,action) {
    const id = action.payload;
    const existingItem = state.cartItems.find((item) => item.id === id);
    state.totalQuantity --;

    if(existingItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
    } else if (existingItem) {
    existingItem.quantity --;
    existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    }

    state.totalAmount = state.cartItems.reduce((total,item) => total + item.price * item.quantity,0)
    setItemFunc(state.cartItems,state.totalAmount,state.totalQuantity)
    },
    //Delete Item
    deleteItem(state,action) {
    const id = action.payload
    const existingItem = state.cartItems.find((item) => item.id === id);

    if(existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
    }
    state.totalAmount = state.cartItems.reduce((total,item) => total + item.price * item.quantity,0)
    setItemFunc(state.cartItems,state.totalAmount,state.totalQuantity)
    },
    //Clear Cart
    clearCart(state) {
       state.cartItems = [];
       state.totalAmount = 0;
       state.totalQuantity = 0; 
       setItemFunc(state.cartItems,state.totalAmount,state.totalQuantity)
    }
    },
    extraReducers: {
    }
})

export const { addItem, deleteItem,removeItem,clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
