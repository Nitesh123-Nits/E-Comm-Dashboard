
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>

      <Route element={<PrivateComponent />}>
      <Route path="/" element={<ProductList/>}/>
      <Route path="/add" element={<AddProduct/>}/>
      <Route path="/update/:id" element={<UpdateProduct/>}/>
      <Route path="/logout" element={<h1>Logout Product Listing component</h1>}/>
      <Route path="/profile" element={<h1>Profile Product Listing component</h1>}/>
      </Route>

      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
