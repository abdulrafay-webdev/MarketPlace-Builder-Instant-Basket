import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "categoryName", maxLength: 96 },
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true, // Allow image cropping
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
