import React from 'react'
import styled from 'styled-components'
import { CartContext } from '../contexts/cartContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UpIcon, DownIcon, TrashIcon } from './icons'
import { useState, useEffect } from 'react'

const Basket = () => {

  const navigate = useNavigate();
  const { getItems, clearCart, increaseQuantity, decreaseQuantity, removeProduct } = useContext(CartContext);

  const [cartItems,setcartItems] = useState([]);

  useEffect(() => {
    setcartItems(getItems());
  },[getItems]);

  const renderCart = () => {
    const items = getItems();
    if (items.length === 0) {
      return <div>Your cart is empty</div>
    } else {
      return items.map(item => (
        <React.Fragment key={item.id}>
          <div key={item.id}><Link to={`/products/${item.id}`}>{item.title}</Link></div>
          <BasketQty>
            {item.quantity}
            <UpIcon width={20} onClick={() => setcartItems(increaseQuantity({ id: item.id }))}/>
            <DownIcon width={20} onClick={() => setcartItems(decreaseQuantity({ id: item.id }))} />
            <TrashIcon width={20} onClick={() => setcartItems(removeProduct({ id: item.id }))} />
          </BasketQty>
          <BasketPrice>
            &pound;{item.price}
          </BasketPrice>
        </React.Fragment>
      ))
    }
  }

  const renderTotal = () => {
    const items = getItems();
    if (items.length !== 0)
      return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  return (
    <BasketContainer>
      <BasketTitle>Shopping Basket</BasketTitle>
      <BasketButton onClick={() => navigate('/checkout')}>Checkout</BasketButton>
      <BasketTable>
        <BasketHeader>
          <h4>Item</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </BasketHeader>
        <BasketHeaderLine />
        <BasketHeader>{renderCart()}</BasketHeader>
        <BasketHeaderLine />
      </BasketTable>
      <BasketButton onClick={() => setcartItems(clearCart())}>Clear</BasketButton>
      <BasketTotal>Total: &pound;{renderTotal()}</BasketTotal>
    </BasketContainer>

  )
}

export default Basket;

const BasketContainer = styled.div`
display: grid;
padding: 20px;
grid-template-rows: 0.25fr 1fr 0.25fr;
grid-template-columns: 0.1fr 1fr 0.1fr;
`;

const BasketTable = styled.div`
grid-column: 1 / span 3;

grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
column-gap: 20px;
padding-left: 10px;
`;

const BasketHeader = styled.div`
display: grid;
grid-template-columns: 1fr 0.5fr 0.5fr;
`;

const BasketHeaderLine = styled.hr`
margin-bottom: 20px;
border: 1px solid gray;
`;

const BasketTitle = styled.h2`
grid-column: 1 / span 2;

padding-bottom: 20px;
`;

const BasketQty = styled.h3`
font-size: 18px;
font-weight: bold;
display: grid;
grid-template-columns: 0.1fr 0.05fr 0.1fr 0.1fr;
`;

const BasketPrice = styled.h3`
font-size: 20px;
font-weight: bold;
`;

const BasketTotal = styled.h2`
justify-self: end;
`;

const BasketButton = styled.button`
border-radius: 8px;
height: 40px;
`;
