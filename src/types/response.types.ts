import { Category } from "@/interfaces/category.interface";
import { listingResponse } from "@/interfaces/listing.api.interface";
import { Product } from "@/interfaces/product.interface";



export type CategoryResponse=listingResponse<Category>
export type ProductResponse=listingResponse<Product>
  export type SingleProduct={
data:Product
    }