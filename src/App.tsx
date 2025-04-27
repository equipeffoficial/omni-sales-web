import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TelaProdutos from './pages/TelaProdutos/TelaProdutos';
import ProductDetail from './pages/ProductDetail';

 /*const App: React.FC = () => {
  return (
    <div className="app-container"> 
      <Header />
      <div className="content">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<TelaProdutos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;   */


function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<TelaProdutos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;