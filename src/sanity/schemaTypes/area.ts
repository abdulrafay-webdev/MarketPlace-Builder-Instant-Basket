import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'area',
  title: 'Area',
  type: 'document',
  fields: [
    defineField({
      name: 'AreaName',
      title: 'Area Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "block",
      type: "string",
      title: "Block"
    }),
  ],
  preview: {
    select: {
      title: 'AreaName', // This is the main title field
      block: 'block', // Selecting block field
    },
    prepare(selection) {
      const { title, block } = selection;
      return {
        title: `${title} - ${block}`, // Combining Area Name and Block
      };
    },
  },
});