import { v4 as uuidv4 } from "uuid";


export default {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "product",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      title: "Products",
    },
    { name: "customerName", type: "string", title: "Customer Name" },
    { name: "customerContact", type: "string", title: "Customer Contact" },
    { name: "customerAddress", type: "string", title: "Customer Address" },
    { name: "TotalPrice", type: "number", title: "Total Price" },
    {
      name: "assignedRider",
      type: "reference",
      to: [{ type: "rider" }],
      title: "Assigned Rider",
    },
    {
      name: "Area",
      type: "reference",
      to: [{ type: "area" }],
      title: "Select Area",
    },
    { name: "deliveryNote", type: "text", title: "Delivery Note" },
    {
      name: "status",
      type: "string",
      title: "Order Status",
      options: { list: ["Pending", "Delivered", "Cancelled"] },
    },
    { name: "paymentId", type: "string", title: "Stripe Payment ID" },
    {
      name: "orderId",
      type: "string",
      title: "Order ID",
      readOnly: true, // Make it read-only so users cannot edit it
      initialValue: () => uuidv4(), // Automatically generates a unique ID
    },
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "orderId",
    },
    prepare(selection:any) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: `Order ID: ${subtitle}`,
      };
    },
  },
};