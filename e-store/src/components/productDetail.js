import React, { useState } from 'react'
import { fetchProductById } from '../fetcher'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components';
import { CartContext } from '../contexts/cartContext';
import { useContext } from 'react'

const ProductDetail = () => {
    const { productId} = useParams();
    const [product, setProduct] = useState({ errorMessage: '', data: {} });
    React.useEffect(() => {
        const fetchData = async () => {
            const productObject = await fetchProductById(productId);
            setProduct(productObject);
        }
        fetchData();
        //console.log(product.data);
    }, [productId]);

    const cartContext = useContext(CartContext);
    const { addProduct } = cartContext;

    return (
        <article>
            <ProductTitle className="category-product-title">
                {product.data.title}
            </ProductTitle>

            <ProductImageContainer className="category-product-image-container">
                <ProductImageContainerImage 
                src={`/assets/${product.data.image}`} alt={product.data.title} />
            </ProductImageContainer>


            <aside>
                <ProductInfo className="category-product-info-dimensions">
                    <h3>Dimensions</h3>
                    <label>{product.data.specs?.dimensions}</label>
                </ProductInfo>

                {product.data.specs?.capacity &&
                    <ProductInfo className="category-product-info-capacity">
                        <h3>Capacity</h3>
                        <label>{product.data.specs.capacity}</label>
                    </ProductInfo>
                }

                <ProductInfo className="category-product-info-features">
                    <h3>Features</h3>
                    <ul>
                        {product.data.features?.map((f, i) => {
                            return <li key={`feature${i}`}>{f}</li>
                        })}
                    </ul>
                </ProductInfo>
            </aside>

            <aside className='category-product-finance'>
                <ProductInfo className="category-product-finance-price">
                    &pound;{product.data.price}
                </ProductInfo>
                <ProductInfo className="category-product-info-stock">
                    <label>stock level: {product.data.stock}</label>
                    <label>free delivery</label>
                </ProductInfo>
                <ButtonContainer className="category-product-action">
                    <button onClick={() => addProduct({ id: product.data.id, title: product.data.title, price: product.data.price})}>add to cart</button>
                </ButtonContainer>
            </aside>
            <ProductDescription>
                {product.data.description}
            </ProductDescription>

        </article>
    )
}

export default ProductDetail

const ProductDescription = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
`;


const ProductTitle = styled.div`
    color: DarkGreen;
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
`;
const ProductImageContainer = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
`;
const ProductImageContainerImage = styled.img`
    width: 60%;
    height: 60%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    padding-left: 20px;
`;