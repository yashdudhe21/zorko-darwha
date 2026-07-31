import {defineType, defineField} from 'sanity'

// Mirrors exactly what index.html's loadMenuFromSanity() reads:
//   _id/id, name, category, price, description, image.asset->url,
//   isBestSeller, subtitle, order
export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description:
        'Must match a menu category, e.g. Burger, Fries, Wraps, Pizza, Momos, Kulhad, Sandwiches, Pasta, Garlic Bread, Special Buns, Toastie, Nachos, Maggi, Cold Coffee, Mojito, Milk Shakes, Ice Tea, Hot, Desserts',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Best Seller?',
      type: 'boolean',
      description: 'Shows the "Best Seller" ribbon on the card',
      initialValue: false,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional small line under the name (e.g. "World’s Thinnest Pizza")',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers show first within a category',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'category', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Untitled item', subtitle: subtitle, media: media}
    },
  },
})
