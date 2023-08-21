import './App.css';
import React, { useState } from 'react';
import { fetchCategories } from './fetcher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './components/categories';
import ProductDetail from './components/productDetail';
import Basket from './components/basket';
import Checkout from './components/checkout';
import Layout from './components/layout';
import Home from './components/home';
import OrderConformation from './components/orderConformation';
import SearchResults from './components/searchResults';

function App() {
  const [categories, setCategories] = useState({ errorMessage: '', data: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      const categoriesObject = await fetchCategories();
      setCategories(categoriesObject);
    }
    fetchData();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout categories={categories} />} >
            <Route index element={<Home />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="basket" element={<Basket />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="categories/:categoryId" element={<Categories />} />
            <Route path="orderconfirmation" element={<OrderConformation />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
