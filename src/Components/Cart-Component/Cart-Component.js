import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from 'path-to-addToCart-action';
import styles from "../../Components/Cart-Component/Cart-Component.module.css";



const CartComponent = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
  
    const handleAddToCart = (item) => {
      dispatch(addToCart(item));
    }

    return (
      <div className={styles.cart}>
        <h3>Shopping Cart</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default CartComponent