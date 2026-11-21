'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
import type { Product } from '@/lib/types';

const categories = ['All', 'T-Shirts', 'Shirts', 'Dresses', 'Keychains'];

// Validate imported catalog entries before rendering cards so a partial or malformed
// product record cannot crash the whole shop route.
const catalog: Product[] = (Array.isArray(products) ? products : []).filter((value): value is Product => {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<Product>;
  return typeof product.id === 'string'
    && typeof product.slug === 'string'
    && typeof product.name === 'string'
    && typeof product.category === 'string'
    && typeof product.price === 'number'
    && Number.isFinite(product.price)
    && typeof product.description === 'string'
    && Array.isArray(product.details)
    && typeof product.image === 'string'
    && typeof product.tone === 'string';
});

export default function ShopPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const visible = useMemo(() => {
    const matching = catalog.filter((product) => category === 'All' || product.category === category);
    return [...matching].sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });
  }, [category, sort]);

  return (
    <section className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">THE RICQ COLLECTION</span>
        <h1>Shop all</h1>
        <p>Everyday pieces, elevated by intention.</p>
      </div>
      <div className="shop-tools">
        <div className="filters" aria-label="Filter products">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`filter-button ${category === item ? 'active' : ''}`} aria-pressed={category === item}>
              {item}
            </button>
          ))}
        </div>
        <label className="sort-select">
          Sort by&nbsp;
          <select aria-label="Sort products by price" className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>
      <div className="product-grid">
        {visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {visible.length === 0 && <p className="empty-state">No products are available in this collection yet.</p>}
    </section>
  );
}
