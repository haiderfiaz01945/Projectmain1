import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import AdminDashboard from './Pages/AdminDashboard';
import Productpage from './Pages/Productpage'
import EditComponent from './Components/EditComponent';
import OrderRecived from './Pages/OrderRecived';
import Completedlist from './Pages/Completedlist';
import Customerinfo from './Pages/customerinfo';
import ScrollToTop from './Components/ScrollToTop';
  export default function App() {
  return (
    
    <Router>
         <ScrollToTop />  

 <div className="mt-16">
        <Nav  /> 
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/Productpage" element={<Productpage />} />
        <Route path="/edit/:id" element={<EditComponent />} />
        <Route path="/order" element={<OrderRecived />} />
        <Route path="/checked" element={<Completedlist />} />
         <Route path="/info/:id" element={<Customerinfo />} />
        </Routes>
        </div>

    </Router>
  );
}
