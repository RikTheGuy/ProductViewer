import { ProductType } from '../../types/product';

const sampleProducts: ProductType[] = [
  {
    barcode: '1',
    name: 'Product1',
    category: 'Beauty',
    sub_category: 'Fashion',
    brand: 'Something',
    division: 'Female',
    image: '',
    mrp: '23',
    sp: '20',
  },
  {
    barcode: '2',
    name: 'Product2',
    category: 'Fashion',
    sub_category: 'Fashion',
    brand: 'Something',
    division: 'Female',
    image: '',
    mrp: '64',
    sp: '50',
  },
  {
    barcode: '3',
    name: 'Product3',
    category: 'Electronics',
    sub_category: 'Computer',
    brand: 'Apple',
    division: 'General',
    image: '',
    mrp: '223',
    sp: '200',
  },
  {
    barcode: '4',
    name: 'Chocolate',
    category: 'Food',
    sub_category: 'Sweet',
    brand: 'Cadbury',
    division: 'General',
    image: '',
    mrp: '10',
    sp: '8',
  },
];

export const ProductsData = { sampleProducts };
