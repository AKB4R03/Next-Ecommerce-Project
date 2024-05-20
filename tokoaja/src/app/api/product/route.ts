import { getProducts } from "@/db/models/product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("name");
  console.log(query, "========== route");

  //   const slug = searchParams.get('slug')
  //   console.log(slug, '<<<< slug');

  const products = await getProducts(query);
  //   console.log(products, "====route nih bang=====");

  return Response.json(
    {
      statusCode: 200,
      message: "succeed get Product",
      data: products,
    },
    {
      // Default status adalah 200
      status: 200,
    }
  );
}
