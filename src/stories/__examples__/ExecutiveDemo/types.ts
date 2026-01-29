export type ThemeOption = 'default' | 'brandA' | 'brandB';
export type ProductLayout = 'vertical' | 'horizontal' | 'compact';

export type ProductData = {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  tags?: string[];
  brand: string;
};
