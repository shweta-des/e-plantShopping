import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => {
    return total + (item.quantity * item.cost);
  }, 0);
};


  const handleContinueShopping = (e) => {
   onContinueShopping();
  };



  const handleIncrement = (item) => {
  // Dispatch action to update the quantity
  dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
};


 const handleDecrement = (item) => {
  if (item.quantity > 1) {
    dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
  } else {
    // If quantity is 1, remove the item from the cart
    dispatch(removeItem(item.id));
  }
};

  const handleRemove = (itemId) => {
  dispatch(removeItem(itemId));
};


  // Calculate total cost based on quantity for an item
 const calculateTotalCost = (item) => {
  return item.quantity * item.cost;
};

const updateCartUI = () => {
  // Update cart icon quantity, subtotals, and total cost
};

const handleItemChange = (item, action) => {
  if (action === 'increment') {
    handleIncrement(item);
  } else if (action === 'decrement') {
    handleDecrement(item);
  }
  updateCartUI();
};

const handleRemoveItem = (itemId) => {
  handleRemove(itemId);
  updateCartUI();
};

const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Update this variable whenever the cart changes
const totalItems = calculateTotalItems(cartItems);


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


