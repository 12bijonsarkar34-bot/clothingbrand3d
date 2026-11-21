import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar, Footer } from '@/components/SiteChrome';
export const metadata: Metadata = { title: 'Ricq | T-Shirts, Shirts, Dresses & Best Keychains Online India', description: 'Discover considered clothing and accessories by Ricq. Shop premium tees, casual shirts, designer dresses and signature keychains online in India.', metadataBase: new URL('https://ricq.in'), openGraph: { title: 'Ricq | Considered essentials', description: 'Modern clothing and accessories, made with intention.', url: 'https://ricq.in', siteName: 'Ricq', type: 'website', images: ['/logo.png.png'] }, twitter: { card: 'summary_large_image', title: 'Ricq | Considered essentials', description: 'Modern clothing and accessories, made with intention.' }, robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CartProvider><Navbar/><main>{children}</main><Footer/></CartProvider></body></html> }
