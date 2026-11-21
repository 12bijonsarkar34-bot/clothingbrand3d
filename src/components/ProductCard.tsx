'use client';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import { useCart } from '@/context/CartContext';
export default function ProductCard({ product }: { product: Product }) { const { addItem } = useCart(); return <article className="product-card"><Link href={`/shop/${product.slug}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span className="product-tone">{product.tone}</span></Link><div className="product-card-info"><div><p className="eyebrow">{product.category}</p><Link href={`/shop/${product.slug}`} className="product-name">{product.name}</Link></div><span className="price">{formatPrice(product.price)}</span></div><div className="card-actions"><Link href={`/shop/${product.slug}`} className="text-link">View details</Link><button onClick={()=>addItem(product.id, 'M')} className="small-button">Add to bag +</button></div></article> }
