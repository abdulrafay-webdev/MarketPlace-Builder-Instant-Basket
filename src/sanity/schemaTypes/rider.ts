import { defineField, defineType } from "sanity";

export default {
  name: "rider",
  type: "document",
  title: "Rider",
  fields: [
    defineField({ name: "name", type: "string", title: "Rider Name" }),
    defineField({ name: "contact", type: "string", title: "Rider Contact" }),
    defineField({ name: "riderId", type: "string", title: "Rider ID" }),
    defineField({
      name: "Area",
      type: "reference",
      to: [{ type: "area" }],
      title: "Assigned Block/Area",
    }),
  ],
  preview: {
    select: {
      title: "name", // Rider Name
      contact: "contact", // Rider Contact
      areaName: "Area.AreaName", // Area Name from reference
      block: "Area.block", // Block from reference
    },
    prepare(selection:any) {
      const { title, contact, areaName, block } = selection;
      return {
        title: `${title} (${contact})`, // Rider name with contact
        subtitle: areaName && block ? `${areaName} - Block ${block}` : "No Area Assigned", // Area and Block
      };
    },
  }
};
