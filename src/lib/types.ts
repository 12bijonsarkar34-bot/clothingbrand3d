export type Product = { id: string; slug: string; name: string; category: string; price: number; description: string; details: string[]; image: string; tone: string };
export type CartItem = { productId: string; size: string; quantity: number };
export const formatPrice = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
