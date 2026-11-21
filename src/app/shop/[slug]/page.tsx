import { notFound } from 'next/navigation';
import products from '@/data/products.json';
import ProductDetail from '@/components/ProductDetail';
export function generateStaticParams(){return products.map(product=>({slug:product.slug}))}
export default function ProductPage({params}:{params:{slug:string}}){const product=products.find(item=>item.slug===params.slug);if(!product)notFound();return <ProductDetail product={product}/>}
