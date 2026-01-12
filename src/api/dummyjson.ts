export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
};

type ProductsResponse = {
  products: Product[];
};

async function safeJson<T>(res: Response): Promise<T> {
  if (res.ok == false) {
    const text = await res.text();
    throw new Error(text);
  }
  return (await res.json()) as T;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products");
  const data = await safeJson<ProductsResponse>(res);
  return data.products;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await safeJson<Product>(res);
}
