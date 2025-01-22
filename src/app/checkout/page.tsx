// "use client";
// import iProduct from "@/types/product";
// import { v4 as uuidv4 } from "uuid";

// import React from "react";
// import { client } from "../../../sanity/lib/client";

// function page() {
//   const value = localStorage.getItem("cart");
//   const cart = value ? JSON.parse(value) : {};
//   const items = Object.values(cart) as iProduct[];
//   console.log(items);

//   const createOrder = async () => {
//     const newOrder = {
//       _type: "order",
//       customerName: "anpryay",
//       customerContact: "03987651234",
//       customerAddress: "North Nazimabad Karachi",
//       deliveryNote: "Leave at the front door.",
//       status: "Pending",
//       paymentId: "08028308474674386",
//       orderId: uuidv4(), // Automatically generates a unique ID

//       product: items.map((item) => ({
//         _type: "reference",
//         _ref: item._id,

//         _key: uuidv4(),
//       })),

//       // product: [

//       //   {
//       //     _type: "reference",
//       //     _ref: "929e6e82-e6d2-4692-96d7-ec5c0643ac3c", // Replace with an actual Product document ID
//       //   },
//       //   {
//       //     _type: "reference",
//       //     _ref: "898c4baf-3266-49b3-a578-0aeb398acf53", // Replace with another Product document ID
//       //   },
//       // ],
//       // assignedRider: {
//       //   _type: "reference",
//       //   _ref: "AAK001", // Replace with an actual Rider document ID
//       // },
//       Area: {
//         _type: "reference",
//         _ref: "1df12402-7b24-42a2-b7c5-9c9de70156ee", // Replace with an actual Area document ID
//       },
//     };

//     try {
//       const result = await client.create(newOrder);
//       console.log("Order created successfully:", result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       checkout page
//       {items.map((item) => (
//         <div key={item._id}>
//           <h1>{item._id}</h1>
//           <h2>{item.categoryName}</h2>
//         </div>
//       ))}
//       <button onClick={() => createOrder()}>create</button>
//     </div>
//   );
// }

// export default page;











// "use client";

// import iProduct from "@/types/product";
// import { v4 as uuidv4 } from "uuid";
// import React, { useEffect, useState } from "react";
// import { client } from "../../../sanity/lib/client";

// const DELIVERY_CHARGES = 90; // Fixed delivery charges

// function CheckoutPage() {
//   const [items, setItems] = useState<iProduct[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [areas, setAreas] = useState([]);
//   const [blocks, setBlocks] = useState([]);
//   const [selectedArea, setSelectedArea] = useState("");
//   const [formData, setFormData] = useState({
//     customerName: "",
//     customerContact: "",
//     customerAddress: "",
//     deliveryNote: "",
//     area: "",
//     block: "",
//   });

//   useEffect(() => {
//     // Fetch cart items from localStorage
//     const value = localStorage.getItem("cart");
//     const cart = value ? JSON.parse(value) : {};
//     const parsedItems = Object.values(cart) as iProduct[];
//     setItems(parsedItems);

//     // Calculate total price
//     const subtotal = parsedItems.reduce(
//       (sum, item) => sum + item.price * (item.quantity || 1),
//       0
//     );
//     setTotalPrice(subtotal + DELIVERY_CHARGES);

//     // Fetch areas and blocks from Sanity
//     const fetchAreas = async () => {
//       const result = await client.fetch(
//         `*[_type == "area"]{_id, AreaName, block}`
//       );
//       setAreas(result);
//     };

//     fetchAreas();
//   }, []);

//   const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const areaId = e.target.value;
//     setSelectedArea(areaId);
//     setFormData({ ...formData, area: areaId, block: "" });

//     // Filter blocks based on selected area
//     const areaBlocks = areas.find((area) => area._id === areaId)?.block || [];
//     setBlocks(areaBlocks.split(",")); // Assuming blocks are comma-separated in Sanity
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, block: e.target.value });
//   };

//   const createOrder = async () => {
//     if (
//       !formData.customerName ||
//       !formData.customerContact ||
//       !formData.customerAddress ||
//       !formData.area ||
//       !formData.block
//     ) {
//       alert("Please fill in all required fields!");
//       return;
//     }

//     const newOrder = {
//       _type: "order",
//       customerName: formData.customerName,
//       customerContact: formData.customerContact,
//       customerAddress: formData.customerAddress,
//       deliveryNote: formData.deliveryNote || "No special instructions",
//       status: "Pending",
//       paymentId: uuidv4(),
//       orderId: uuidv4(),
//       TotalPrice: totalPrice,
//       product: items.map((item) => ({
//         _type: "reference",
//         _ref: item._id,
//         _key: uuidv4(),
//       })),
//       Area: {
//         _type: "reference",
//         _ref: formData.area,
//       },
//     };

//     try {
//       const result = await client.create(newOrder);
//       console.log("Order created successfully:", result);
//       alert("Order placed successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Error creating order. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Checkout Page</h1>
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//         {/* Product List */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           {items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <div>
//               <div className="grid grid-cols-4 gap-4 font-bold border-b pb-2 mb-4">
//                 <span>Product</span>
//                 <span>Price</span>
//                 <span>Quantity</span>
//                 <span>Total</span>
//               </div>
//               {items.map((item) => (
//                 <div
//                   key={item._id}
//                   className="grid grid-cols-4 gap-4 items-center border-b py-2"
//                 >
//                   <span>{item.name}</span>
//                   <span>Rs. {item.price}</span>
//                   <span>{item.quantity || 1}</span>
//                   <span>Rs. {item.price * (item.quantity || 1)}</span>
//                 </div>
//               ))}
//               <div className="mt-4 text-right font-bold">
//                 <p>Delivery Charges: Rs. {DELIVERY_CHARGES}</p>
//                 <p>Total Price: Rs. {totalPrice}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form Section */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-4">Customer Details</h2>
//           <form className="grid grid-cols-1 gap-4">
//             <input
//               type="text"
//               name="customerName"
//               placeholder="Customer Name"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               required
//             />
//             <input
//               type="text"
//               name="customerContact"
//               placeholder="Customer Contact"
//               value={formData.customerContact}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               required
//             />
//             <input
//               type="text"
//               name="customerAddress"
//               placeholder="Customer Address"
//               value={formData.customerAddress}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               required
//             />
//             <select
//               name="area"
//               value={formData.area}
//               onChange={handleAreaChange}
//               className="w-full p-3 border rounded-lg"
//               required
//             >
//               <option value="">Select Area</option>
//               {areas.map((area) => (
//                 <option key={area._id} value={area._id}>
//                   {area.AreaName}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="block"
//               value={formData.block}
//               onChange={handleBlockChange}
//               className="w-full p-3 border rounded-lg"
//               required
//               disabled={!selectedArea}
//             >
//               <option value="">Select Block</option>
//               {blocks.map((block) => (
//                 <option key={block} value={block}>
//                   {block}
//                 </option>
//               ))}
//             </select>
//             <textarea
//               name="deliveryNote"
//               placeholder="Delivery Note (Optional)"
//               value={formData.deliveryNote}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//             ></textarea>
//           </form>
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={createOrder}
//           className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CheckoutPage;












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
