import { createCart, deleteCart, findCart } from "@/db/models/cart";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
    statusCode: number;
    message?: string;
    data?: T;
    error?: string;
}

export async function POST(request: Request) {

    try {
        
        const userId =  request.headers.get("x-user-id")
        const productId = await request.json();

        const data = {
            "userId": `${userId}` ,
            "productId": `${productId}`
        }

        

        const cart = await createCart(data)
    
        return NextResponse.json<MyResponse<unknown>>(
            {
                statusCode: 201,
                message: "succeed create cart",
                data: cart
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error, '==============');
    }
}

export async function GET(request: NextRequest) {


    const userId =  request.headers.get("x-user-id")

    console.log(request.headers.get("x-user-id"), '=========');

    const data = {
        "userId": `${userId}` ,
    }

    const userCart = await findCart(data)

    return Response.json(
        {   
            statusCode : 200,
            message: "succeed get Wishlist",
            data: userCart
        },
        {
            // Default status adalah 200
            status: 200,
        },
    )
}

export const  DELETE = async (request: NextRequest) => {
    const WishId = await request.json();

    await deleteCart(WishId)

    return Response.json(
        {   
            statusCode : 200,
            message: "succeed delete WishList",
        },
        {
            status: 201,
        },
    )

} 