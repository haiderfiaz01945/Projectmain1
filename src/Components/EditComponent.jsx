import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData, updateProduct } from '../Redux/AdminSlices';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { motion } from 'framer-motion';

function EditComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.admin);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [img, setImg] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');


  
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delayChildren: 0.2,
        staggerChildren: 0.2, // Slows down the stagger between items
      },
    },
  };
  
  // Variants for the individual items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      backgroundColor: '#f3d1ca',
    },
    visible: {
      opacity: 1,
      y: 0,
      backgroundColor: "#fdf9f9", // Background reveal animation
      transition: {
        duration: 0.6, // Slows down the reveal animation for each item
      },
    },
  };
  


  
  // Fetch product data
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsData());
    }
  }, [dispatch, status]);

  // Load selected product data into the form fields
  useEffect(() => {
    if (products.length > 0 && id) {
      const selectedProduct = products.find((prod) => prod.id === parseInt(id));
      if (selectedProduct) {
        setTitle(selectedProduct.Title);
        setDescription(selectedProduct.Description);
        setPrice(selectedProduct.Price);
        setCategory(selectedProduct.Category);
        setImg(selectedProduct.img);
        setImg2(selectedProduct.img2);
        setImg3(selectedProduct.img3);
        setImg4(selectedProduct.img4);
        setQuantity(selectedProduct.quantity);
      }
    }
  }, [products, id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: parseInt(id), title, description, price, quantity, category, img , img2 , img3 , img4}))
      .then(() => {
        navigate('/Productpage'); // Navigate to the product page after updating
      })
      .catch((error) => console.error('Failed to save product: ', error));
  };

  const CategoryDropdown = ({ selectedCategory, onSelectCategory }) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        {/* Dropdown Button */}
        <Menu.Button className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium flex items-center">
          {selectedCategory || "Select Category"}
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </Menu.Button>
  
        {/* Animated Dropdown Menu */}
        <Menu.Items
          as={motion.div}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          className="absolute mt-2 w-40 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10 origin-top-right"
        >
          {/* Dropdown Items */}
          {["Necklaces", "Bracelets", "EarRings", "Nails","Rings", "Bundles"].map((category) => (
            <Menu.Item key={category}>
              {({ active }) => (
                <motion.div
                  variants={itemVariants}
                  className=""
                >
                  <button
                    onClick={() => onSelectCategory(category)}
                    className={`block px-4 py-2 text-sm w-full text-left
                              ${active ? "bg-[#F8E8EE] text-[#D87C9E]" : "text-[#F2BED1]   hover:text-[#D87C9E]"}`}
                  >
                    {category}
                  </button>
                </motion.div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
  };

  // Handle category selection from dropdown
  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  if (status === 'loading') {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg py-6">
      <div
    aria-hidden="true"
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    />
  </div>
  
  <div
    aria-hidden="true"
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
      
   </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
         Edit Product
                 </h2> */}

        <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 bg-[#F9F5F6] rounded-lg shadow-md">
       <motion.div          
        key={products.index}
        className="bg-white p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"
        whileHover="hover"       > 



        
        <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
              />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <CategoryDropdown selectedCategory={category} onSelectCategory={handleSelectCategory} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
              />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
              />
          </div>
          <div className="mb-4">
            <label htmlFor="img" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="img2" className="block text-sm font-medium text-gray-700">Image2 URL</label>
            <input
              type="text"
              id="img2"
              value={img2}
              onChange={(e) => setImg(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="img3" className="block text-sm font-medium text-gray-700">Image3 URL</label>
            <input
              type="text"
              id="img3"
              value={img3}
              onChange={(e) => setImg(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="img4" className="block text-sm font-medium text-gray-700">Image4 URL</label>
            <input
              type="text"
              id="img4"
              value={img4}
              onChange={(e) => setImg(e.target.value)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              required
            />
          </div>
          </motion.div>  

          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#F2BED1] text-white font-medium rounded-md shadow-sm hover:bg-[#FDCEDF] transition-colors duration-200"
            >
            Save Changes
            <CloudDoneOutlinedIcon fontSize="medium" className="ml-1" />
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditComponent;
