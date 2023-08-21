import React from 'react';
import { useState, useEffect } from 'react';
import { fetchProductsByQuery } from '../fetcher';
import { useSearchParams } from 'react-router-dom';
import CategoryProduct from './categoryProduct';
const SearchResults = () => {
    const [products, setProducts] = useState({errorMessage: '', data: []});

    const [searchParams] = useSearchParams();
    const query = searchParams.get('s');

    useEffect(() => {
        const fetchData = async () => {
            const productsObject = await fetchProductsByQuery(query);
            setProducts(productsObject);
        }
        fetchData();
    },[query]);

    const renderProducts = () => {
        if(products.data.length>0){
        return (
          products.data.map(p =>
            <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
          )
        )}
        else{
            return <div>No products found</div>
        }
      };

  return (
    <div>
    {products.errorMessage && <div>{products.errorMessage}</div>}
    {products.data && renderProducts()}
    </div>
  )
}

export default SearchResults
