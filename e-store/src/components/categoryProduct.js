import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { CartContext } from '../contexts/cartContext'
import { useContext } from 'react'

const CategoryProduct = ({ id, title, image, specs, features, price, stock }) => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const { addProduct } = cartContext;


    return (
        <article>
            <ProductTitle>
                <Link to={`/products/${id}`}>{title}</Link>
            </ProductTitle>

            <figure>
                <ProductImageContainer>
                    <ProductImageContainerImage src={`/assets/${image}`} alt={title} />
                </ProductImageContainer>
            </figure>

            <aside>
                <ProductInfo>
                    <h3>Dimensions</h3>
                    <label>{specs.dimensions}</label>
                </ProductInfo>

                {specs.capacity &&
                    <ProductInfo>
                        <h3>Capacity</h3>
                        <label>{specs.capacity}</label>
                    </ProductInfo>
                }

                <ProductInfo className="category-product-info-features">
                        <h3>Features</h3>
                        <ul>
                            {features?.map((f, i) => {
                                return <li key={`feature${i}`}>{f}</li>
                            })}
                        </ul>
                </ProductInfo>
            </aside>

            <aside className='category-product-finance'>
                <ProductInfo>
                    <h3>Price</h3>
                    <div className="category-product-finance-price">
                        &pound;{price}
                    </div>
                    <div className="category-product-info-stock">
                        <label>Stock Level: {stock}</label>
                        <label> (free delivery)</label>
                    </div>
                </ProductInfo>
                <ButtonContainer className="category-product-action">
                    <button onClick={() => navigate(`/products/${id}`)}>view product</button>
                    <button onClick={() => addProduct({ id, title, price })}>add to cart</button>
                </ButtonContainer>
            </aside>
        </article>
    )
}

export default CategoryProduct

const ProductTitle = styled.div`
    grid-column: 1/span 3;
    color:darkblue;
    font-weight: bold;
    font-size: 1.5rem;
    padding-left: 10px;
`;
const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
`;
const ProductImageContainerImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
`;