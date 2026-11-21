import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar, Footer } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Ricq | T-Shirts, Shirts, Dresses & Best Keychains Online India',
  description: 'Discover considered clothing and accessories by Ricq. Shop premium tees, clothing, and more.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
