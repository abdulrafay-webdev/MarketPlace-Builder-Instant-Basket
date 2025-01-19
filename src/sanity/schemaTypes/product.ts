

export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "name", type: "string", title: "Product Name" },
    { name: "description", type: "text", title: "Description" },
    { name: "price", type: "number", title: "Price" },
    {
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      title: "Category",
    },
    { name: "sku", type: "string", title: "SKU" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true, // Allow image cropping
      }
    },
  ],
};
