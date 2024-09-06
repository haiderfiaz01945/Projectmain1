import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './Redux/AdminStore.jsx';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000} // Toast will auto close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} // Use the actual transition component
      />
    </Provider>
  </StrictMode>
);
