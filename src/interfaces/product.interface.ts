import { Category } from "./category.interface";
import { Subcategory } from "./subcategory.interface";

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  availableColors?: any[]; 
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}