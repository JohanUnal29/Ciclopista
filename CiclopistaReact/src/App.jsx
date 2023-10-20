import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import Footer from './components/subcomponents/footer/Footer';
import ProductListContainer from './components/products/productContainer/ProductListContainer';
import ProductDetailContainer from './components/products/productDetailContainer/ProductDetailContainer';
import OrderListContainer from './components/orders/orderContainer/OrderListContainer';
import { CartProvider } from './context/CartContext';
import OrderDetailContainer from './components/orders/orderDetailContainer/OrderDetailContainer';
import ProfilePage from './components/profile/ProfilePage';
import UserListContainer from './components/users/userContainer/UserListContainer';
import Checkout2 from './components/products/cart/Checkout2';

// import ItemDetailContainer from "./components/Adopt/ItemDetailContainer";
// import Request from './components/request/Request';
function App() {


  return (

    <div>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/products' element={<ProductListContainer />} />
            <Route path="/products/:categoria" element={<ProductListContainer />} />
            <Route path="/product/:id" element={<ProductDetailContainer />} />
            <Route path="/orders" element={<OrderListContainer />} />
            <Route path="/orders/:status" element={<OrderListContainer />} />
            <Route path="/orderr/:id" element={<OrderDetailContainer/>} />
            <Route path="/ProfilePage" element={<ProfilePage/>}/>
            <Route path="/UserManager" element={<UserListContainer/>}/>
            <Route path="/checkout2" element={<Checkout2/>} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </CartProvider>

    </div>
  );
}
export default App;
