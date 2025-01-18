export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      { name: "orderId", type: "string", title: "Order ID" },
      { name: "product", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }], title: "Products" },
      { name: "customerName", type: "string", title: "Customer Name" },
      { name: "customerContact", type: "string", title: "Customer Contact" },
      { name: "customerAddress", type: "string", title: "Customer Address" },
      { name: "assignedRider", type: "reference", to: [{ type: "rider" }], title: "Assigned Rider" },
      { name: "deliveryNote", type: "text", title: "Delivery Note" },
      { name: "status", type: "string", title: "Order Status", options: { list: ["Pending", "Delivered", "Cancelled"] } },
      { name: "paymentId", type: "string", title: "Stripe Payment ID" },
    ],
  };
  