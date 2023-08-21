import React from 'react'
import { fetchProducts } from '../fetcher';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CategoryProduct from './categoryProduct';

const Categories = ({id, title,onCategoryClick}) => {
    const [products, setProducts] = useState({errorMessage: '', data: []});
    const {categoryId} = useParams();
    React.useEffect(() => {
        const fetchData = async () => {
            const productsObject = await fetchProducts(categoryId);
            setProducts(productsObject);
        }
        fetchData();
    },[categoryId]);

    const renderProducts = () => {
        return (
          products.data.map(p =>
            <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
          )
        );
      };
    
    return (
        <div>
        {products.errorMessage && <div>{products.errorMessage}</div>}
        {products.data && renderProducts()}
        </div>
    )
}

export default Categories
