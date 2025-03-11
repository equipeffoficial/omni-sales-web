import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Product";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="app-container"> {/* Garante que ocupa toda a tela */}
      <Header />
      <div className="content"> {/* Expande para empurrar o footer para baixo */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;