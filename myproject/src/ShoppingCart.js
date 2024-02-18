// ShoppingCart.js
import React, { Component, useState } from 'react';
import './ShoppingCart.css';

// Functional component for adding items
const AddItemForm = ({ addItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    addItem({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

// Class component for displaying the shopping cart
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem = (item) => {
    this.setState({ items: [...this.state.items, item] });
  };

  removeItem = (index) => {
    const updatedItems = [...this.state.items];
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems });
  };

  render() {
    const totalPrice = this.state.items.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

    return (
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <div className="items">
          {this.state.items.map((item, index) => (
            <div key={index} className="item">
              <div className="item-details">
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
              <button onClick={() => this.removeItem(index)}>Remove</button>
            </div>
          ))}
        </div>
        <p className="total">Total: ${totalPrice.toFixed(2)}</p>
        <AddItemForm addItem={this.addItem} />
      </div>
    );
  }
}

export default ShoppingCart;
