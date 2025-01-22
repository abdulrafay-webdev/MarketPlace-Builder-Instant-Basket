// File: pages/checkout.js
'use client'
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contact: "",
    address: "",
    area: "",
    deliveryNote: "",
  });
  
  useEffect(() => {
    const value = localStorage.getItem("cart");
    const cart = value ? JSON.parse(value) : {};
    const items = Object.values(cart); // Assuming cart structure is a key-value pair
    setCartItems(items);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      product: cartItems.map((item) => ({ _ref: item.id, _type: "reference" })),
      customerName: customerDetails.name,
      customerContact: customerDetails.contact,
      customerAddress: customerDetails.address,
      Area: { _ref: customerDetails.area, _type: "reference" },
      deliveryNote: customerDetails.deliveryNote,
      status: "Pending",
      paymentId: "mock_payment_id", // Replace with actual payment integration
      orderId: uuidv4(),
    };

    try {
      const response = await axios.post("/api/orders", orderData);
      if (response.status === 200) {
        alert("Order created successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        setCustomerDetails({ name: "", contact: "", address: "", area: "", deliveryNote: "" });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Cart Items</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>{item.name} - {item.price}</li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Customer Details</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={customerDetails.contact}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={customerDetails.area}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Delivery Note:
          <textarea
            name="deliveryNote"
            value={customerDetails.deliveryNote}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
