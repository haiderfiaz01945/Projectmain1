import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Fetch order data from Supabase
export const fetchOrderData = createAsyncThunk(
  "Order/fetchOrderData",
  async () => {
    let { data, error } = await supabase
      .from('test') // Replace 'test' with your table name
      .select('*');
      
    if (error) {
      throw new Error(error.message);
    }

    // Check if 'order_data' needs parsing
    return data.map(item => ({
      ...item,
      order_data: typeof item.order_data === 'string' ? JSON.parse(item.order_data) : item.order_data
    }));
  }
);


// Remove Product from the list
export const CancleOrder = createAsyncThunk(
  "orders/CancleOrder",
  async (id, { rejectWithValue }) => {
    try {
      // Ensure the correct table name and column filter are used
      const { error } = await supabase
        .from('test') // Make sure this is the correct table name
        .delete() // Deletes the row
        .eq('id', id); // Match by the 'id' column

      if (error) {
        throw new Error(error.message);
      }
      
      return id; // Return the ID of the deleted item for further use in reducers
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const markAsCompleted = createAsyncThunk(
  'items/markAsCompleted',
  async (id) => {
    const { data, error } = await supabase
      .from('test')
       // Replace with your table name
       
      .update({ Completed: true }) // Update the 'Completed' column to true
      .eq('id', id); // Filter by the item's id
    
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);
 
// Initial state for the slice
const initialState = {
  Orders: [],
  status: 'idle',
  error: null,
};

// Slice
const OrderSlice = createSlice({
  name: 'Orderlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Orders = action.payload;  
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
 
    .addCase(CancleOrder.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(CancleOrder.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.Orders = state.Orders.filter(e => e.id !== action.payload);
    })
    .addCase(CancleOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message; // Corrected to set the error message
    }) ;
  },
});

export default OrderSlice.reducer;
