"use server";
import { deleteCart } from "@/db/models/cart";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Response = {
  statusCode: number;
  message: string;
  data: Mantap[];
};

export type Mantap = {
  _id: string;
  userId: string;
  productId: string;
  Products: Product[];
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
};

export const actionCart = async () => {
  try {
    let response = await fetch(`http://localhost:3000/api/cart`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: cookies().toString(),
      },
    });

    const resJson: Response = await response.json();

    if (!response.ok) {
      throw new Error("an error occurred while fetching data");
    }

    const data = resJson.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleRemoveCart = async (formData: FormData) => {
  try {
    console.log("ini remove !!!!!");

    const data = formData.get("id");

    const id = JSON.parse(JSON.stringify(data));

    // const data = JSON.parse(JSON.stringify(id));

    await deleteCart(id);

    return (window.location.pathname = "/cart");
  } catch (error) {
    console.log(error);
  }
};
