import { getProductBySlug } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
    statusCode: number;
    message?: string;
    data?: T;
    error?: string;
  };

export const  GET = async (request: NextRequest,  { params }: { params: { slug: string } },) => {

    // console.log(params, '===========');

    const slug = params.slug

    const product = await getProductBySlug(slug)

    return  NextResponse.json<MyResponse<unknown>>(
        {   
            statusCode : 200,
            message: "succeed get product by slug",
            data: product
        },
        {
            // Default status adalah 200
            status: 200,
        },
    )
}