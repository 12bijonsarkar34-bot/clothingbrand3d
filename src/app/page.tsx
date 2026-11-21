import HomeExperience from '@/components/HomeExperience';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
export default function HomePage(){return <><HomeExperience/><section className="page-shell"><div className="page-heading"><span className="eyebrow">THE RICQ SELECTION</span><h1>Considered essentials.</h1><p>Pieces to reach for, season after season.</p></div><div className="product-grid">{products.slice(0,4).map(product=><ProductCard key={product.id} product={product}/>)}</div><div style={{textAlign:'center',marginTop:46}}><a href="/shop" className="button-outline">Explore the collection ↗</a></div></section></>}
