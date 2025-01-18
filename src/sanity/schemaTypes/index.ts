import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import category from './category'
import order from './order'
import rider from './rider'
import customer from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category,order,rider,customer],
}
