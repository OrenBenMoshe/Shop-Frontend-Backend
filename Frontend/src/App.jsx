import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Store from "./components/Store";
import About from "./components/About";
import Navbar from "./components/Navbar";
import ItemPage from "./components/ItemPage";
import Login from "./components/Login";
import Register from "./components/Register";
import EnterPage from "./components/EnterPage";
import Footer from "./components/Footer";
import Posts from "./components/Posts";
import EditPost from "./components/EditPost";
import ErrorPage from "./components/ErrorPage";
import { CartProvider } from "./contexts/CartContext";
import { ItemsProvider } from "./contexts/ItemsContext";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <Router>
      <div>
        <UserProvider>
          <CartProvider>
            <ItemsProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<EnterPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Store" element={<Store />} />
                <Route path="/About" element={<About />} />
                <Route path="/Posts" element={<Posts />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/ItemPage" element={<ItemPage />} />
                <Route path="/EditPost" element={<EditPost />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </ItemsProvider>
          </CartProvider>
          <Footer />
        </UserProvider>
      </div>
    </Router>
  );
};

export default App;
