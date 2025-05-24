import { api } from "@/lib/axios";

export interface GetPopularProductsResponse {
  popularProducts: {
    product: string;
    amount: number;
  }[];
}

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
  );

  return response.data;
}
