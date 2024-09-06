import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData, CancleOrder , markAsCompleted } from "../Redux/OrderSlice"; // Adjust the import path as needed
import { toast, Bounce } from "react-toastify";
import RemoveDoneRoundedIcon from '@mui/icons-material/RemoveDoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Import icons as needed
import LoaderOrderRecived from "../Components/LoaderOrderRecivied";

const OrderRecived = () => {
  const dispatch = useDispatch();
  const { Orders, status, error } = useSelector((state) => state.Orderlist);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrderData());
    }
  }, [dispatch, status]);

  const handleCompletedOrder = (id) => {
    dispatch(markAsCompleted(id))
      .unwrap()
      .then(() => {
        // Re-fetch the orders after marking as completed
        dispatch(fetchOrderData());
  
        toast.success(`Order Dispatched from Store!`, {
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
      })
      .catch((error) => {
        toast.error(`Failed to mark as completed: ${error}`, {
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
      });
  };
  

  // Safely filter the orders to exclude completed ones
  const markasDone = Orders?.filter(order => !order.Completed) || [];
  // if (markasDone.length === 0) {
  //   return <div className="text-center py-16">No orders received yet.</div>;
  // }

  // Handle removing a product
  const handleCancleOrder = (id ) => {
    dispatch(CancleOrder(id))
      .unwrap()
      .then(() => {
        toast.success(`Order! Cancled `, {
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
      })
      .catch((error) => {
        toast.error(`Failed to dispatch: ${error}`, {
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
      });
  };

  if (status === 'loading') {
    return <div><LoaderOrderRecived/></div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  // if (Orders.length === 0) {
  //   return <div className="text-center py-16">No order data available.</div>;
  // }
  
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
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#892dc2] via-[#e34680] to-[#db8ab3] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-[#f2bed1] via-[#f8e8ee] to-[#d946ef] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>

    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Order Details</h2>

        { markasDone.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Full Name: {order.order_data.fullName}</h3>
            <p className="text-lg text-gray-700 mb-2">Phone: {order.order_data.Phone}</p>
            <p className="text-lg text-gray-700 mb-2">Email: {order.order_data.Email}</p>
            <p className="tex0 t-lg text-gray-70mb-2">Address: {order.order_data.city}, {order.order_data.address1}, {order.order_data.block}, {order.order_data.address2}</p>
            <p className="text-lg text-gray-700 mb-2">Total + COD: ${order.order_data.Total}</p>
            <p className="text-lg text-gray-700 mb-2">Payment Method: {order.order_data.paymentMethod}</p>

            <div className="relative mt-6">
      <label className="block text-gray-800 text-lg font-semibold mb-2">Products Details</label>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span>View Products</span>
          <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>
        <Menu.Items className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
          {order.order_data.products.map((product) => (
            <div key={product.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center">
                <img
                  src={product.img}
                  alt={product.Title}
                  className="h-24 w-24 object-cover object-center mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{product.Title}</h4>
                  <p className="text-sm text-gray-600">Category: {product.Category}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-lg font-medium text-gray-800">Price: ${product.Price}</p>
                </div>
              </div>
            </div>
          ))}
        </Menu.Items>


        
      </Menu>
    </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleCompletedOrder(order.id)}
                aria-label={`Mark ${order.order_data.fullName} as dispatched`}
                className="flex items-center bg-green-500  text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out text-sm sm:text-base"
              >
                Completed 
                <DoneAllRoundedIcon className='ml-1' fontSize="small" />
                 
              </button>
              <button
                onClick={() => handleCancleOrder(order.id, order.order_data.fullName)}
                aria-label={`Mark ${order.order_data.fullName} as dispatched`}
                className="flex items-center bg-red-500  text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out text-sm sm:text-base"
              >
                Cancle 
                <RemoveDoneRoundedIcon className='ml-1' fontSize="small" />
                 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderRecived;
