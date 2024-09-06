import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./AdminSlices"; // Import the admin reducer
import orderReducer from './OrderSlice'
const store = configureStore({
    reducer: {
        admin: adminReducer, // Make sure the key matches what you'll use in useSelector
        Orderlist:orderReducer,
     },
});

export default store;
 