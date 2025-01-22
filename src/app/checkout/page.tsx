"use client";

import iProduct from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { toast } from "react-toastify";
import { set } from "sanity";

const DELIVERY_CHARGES = 90; // Fixed delivery charges

function CheckoutPage() {
  const [items, setItems] = useState<iProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [areas, setAreas] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    customerContact: "",
    customerAddress: "",
    deliveryNote: "",
    area: "",
    block: "",
  });

  useEffect(() => {
    // Fetch cart items from localStorage
    const value = localStorage.getItem("cart");
    const cart = value ? JSON.parse(value) : {};
    const parsedItems = Object.values(cart) as iProduct[];
    setItems(parsedItems);

    // Calculate total price
    const subtotal = parsedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(subtotal + DELIVERY_CHARGES);

    // Fetch areas and blocks from Sanity
    const fetchAreas = async () => {
      const result = await client.fetch(
        `*[_type == "area"]{_id, AreaName, block}`
      );
      setAreas(result);
    };

    fetchAreas();
  }, []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedOption(selected);

    const [area, block] = selected.split("|");
    setFormData({ ...formData, area, block });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    if (
      !formData.customerName ||
      !formData.customerContact ||
      !formData.customerAddress ||
      !formData.area ||
      !formData.block
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    const newOrder = {
      _type: "order",
      customerName: formData.customerName,
      customerContact: formData.customerContact,
      customerAddress: formData.customerAddress,
      deliveryNote: formData.deliveryNote || "No special instructions",
      status: "Pending",
      paymentId: uuidv4(),
      orderId: uuidv4(),
      TotalPrice: totalPrice,
      product: items.map((item) => ({
        _type: "reference",
        _ref: item._id,
        _key: uuidv4(),
      })),
      Area: {
        _type: "reference",
        _ref: formData.area,
      },
    };

    try {
      const result = await client.create(newOrder);
      console.log("Order created successfully:", result);
      toast.success("Order placed successfully!");
      setFormData({    customerName: "",
        customerContact: "",
        customerAddress: "",
        deliveryNote: "",
        area: "",
        block: ""},)
    } catch (error) {
      console.error(error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout Page</h1>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Product List */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <div className="grid grid-cols-4 gap-4 font-bold border-b pb-2 mb-4">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-4 gap-4 items-center border-b py-2"
                >
                  <span>{item.name}</span>
                  <span>Rs. {item.price}</span>
                  <span>{item.quantity || 1}</span>
                  <span>Rs. {item.price * (item.quantity || 1)}</span>
                </div>
              ))}
              <div className="mt-4 text-right font-bold">
                <p>Delivery Charges: Rs. {DELIVERY_CHARGES}</p>
                <p>Total Price: Rs. {totalPrice}</p>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="customerContact"
              placeholder="Customer Contact"
              value={formData.customerContact}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="customerAddress"
              placeholder="Customer Address"
              value={formData.customerAddress}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Area and Block</option>
              {areas.map((area) => (
                <option key={area._id} value={`${area._id}|${area.block}`}>
                  {area.AreaName} - {area.block}
                </option>
              ))}
            </select>
            <textarea
              name="deliveryNote"
              placeholder="Delivery Note (Optional)"
              value={formData.deliveryNote}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </form>
        </div>

        {/* Submit Button */}
        <button
          onClick={createOrder}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
