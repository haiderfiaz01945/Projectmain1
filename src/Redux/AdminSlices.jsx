import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { createClient } from "@supabase/supabase-js";
// Initialize Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


// to fetch data used in products page 
export const fetchProductsData = createAsyncThunk(
  "Product/fetchProductsData",
  async () => {
    
    let { data, error } = await supabase
      .from('Products')
      .select('*')
              
    if (error) {
      throw new Error(error.message);
    }

    return data; 
  }
);


// Async thunk to add products to the database
export const addProducts = createAsyncThunk(
  "admin/addProducts",
  // console.log('in data base: ',data),
  async ({ title, description, price, category , img  , quantity , img2 , img3 , img4}) => {
    const { data, error } = await supabase
      .from('Products')
      .insert([{ Title: title, Description: description, Price: price, Category: category ,   img: img , quantity: quantity , img2:img2 , img3:img3  , img4: img4 }]);
    
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);
 

// Remove Products from my list 
export const RemoveProducts = createAsyncThunk(
  "admin/RemoveProducts",
 async (id)=>{
  const { error } = await supabase 
  .from('Products')
.delete()
.eq('id',id);
if ( error ){
  throw new  Error(error.message);

}
return id;
 }  

);
 
// Async thunk to update products in the database
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, title, description, price, category, img, quantity, cart }) => {
    const { data, error } = await supabase
      .from('Products')
      .update({
        Title: title,
        Description: description,
        Price: price,
        Category: category,
        img: img,
        quantity: quantity,
        Cart: cart // If you also need to update the Cart field
      })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);


 
// make an seprate state to handle and update quantity 



 
// Initial state for the slice
const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

// Slice definition
const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
// fetch  products 
    .addCase(fetchProductsData.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductsData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload; // Assuming the payload is the list of products
    })
    .addCase(fetchProductsData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }) 
//Push products  
      .addCase(addProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);


       })
      .addCase(addProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
 
 //Remove Products 
 .addCase(RemoveProducts.pending, (state)=>{
  state.status='Loading';
 })
 
 .addCase(RemoveProducts.fulfilled, (state,action)=>{
  state.status='succeeded';
  state.products = state.products.filter(e => e.id !== action.payload);
 })
 
 .addCase(RemoveProducts.rejected, (state,action)=>{
  state.status='failed';
  state.products =  action.error.message;
 })
 

    }



});

export default AdminSlice.reducer;
