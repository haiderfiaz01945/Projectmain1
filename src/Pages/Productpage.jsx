import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData, RemoveProducts } from "../Redux/AdminSlices";
import { Link } from "react-router-dom";
import LoaderProduct from "../Components/LoaderProduct";
import { toast, Bounce } from "react-toastify";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const Productpage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.admin);

  // Fetch the product list every time the component mounts
  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  // Handle removing a product
  const handleRemoveProduct = (id, title) => {
    dispatch(RemoveProducts(id));
    toast.success(`${title} removed from Store!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Calculate total cost
  const totalCost = products.reduce(
    (acc, product) => acc + (product.Price || 0) * (product.quantity || 1),
    0
  );

  if (status === 'loading') {
    return <div><LoaderProduct/></div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-16">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#F9F5F6] via-[#FDCEDF] to-[#A855F7] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-[#F2BED1] via-[#F8E8EE] to-[#D946EF] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          All Products
        </h2>
        <div className="mt-8 flex justify-between items-center">
          <h3 className="text-lg font-bold">Total Cost</h3>
          <p className="text-xl font-semibold text-[#8d67c2]">Rs:{totalCost}</p>
        </div>

        {/* Grid layout for products */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-1 xl:grid-cols-4 xl:gap-x-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 flex flex-col"
            >
              <div className="relative w-full overflow-hidden bg-[#F8E8EE] rounded-t-lg">
                <img
                  alt={product.Description || 'Product Image'}
                  src={product.img || 'https://via.placeholder.com/150'}
                  className="w-full h-48 object-cover object-center"
                  style={{ height: '200px' }} // Ensure all images have the same height
                />
              </div>
              <div className="p-4 flex flex-col flex-grow items-start justify-between">
                <h3 className="text-base font-semibold text-gray-800">
                  <span className="hover:text-[#F2BED1]">Item: {product.Title}</span>
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Quantity: {product.quantity || 'No quantity available'}
                </p>
                <p className="mt-2 text-lg font-medium text-[#FDCEDF]">
                  ${product.Price ? product.Price.toFixed(2) : '0.00'}
                </p>
                
                <p>Subtotal: ${product.Price * (product.quantity || 1)}</p>
                
                <div className="mt-4 flex space-x-2">
                  <Link
                    to={`/Edit/${product.id}`}
                    className="flex items-center bg-blue-500 text-white font-medium py-2 px-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out text-sm sm:text-base"
                    aria-label={`Edit ${product.Title}`}
                  >
                    Edit
                    <ModeEditOutlinedIcon fontSize="small" />
                  </Link>

                  <button
                    onClick={() => handleRemoveProduct(product.id, product.Title)}
                    aria-label={`Remove ${product.Title}`}
                    className="flex items-center bg-red-500 text-white font-medium py-2 px-1.5 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out text-sm sm:text-base"
                  >
                    Delete
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productpage;
