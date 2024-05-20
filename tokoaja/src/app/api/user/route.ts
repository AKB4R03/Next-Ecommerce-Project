import { createUser } from "@/db/models/user";
import { NextResponse } from "next/server";
import {z} from "zod"


type MyResponse<T> = {
    statusCode: number;
    message?: string;
    data?: T;
    error?: string;
}

const userInputSchema = z.object({
   username: z.string(),
   email: z.string().email(),
   password: z.string().min(5),
   name: z.string().optional() 
})

export async function POST(request: Request) {
 try {
    
     const data = await request.json()
     console.log(data);
     const parsedData = userInputSchema.safeParse(data);
    
     if(!parsedData.success) {
         throw parsedData.error
     }
    
     const user = await createUser(data)
    
    
     return NextResponse.json<MyResponse<unknown>>(
         {
             statusCode: 201,
             message: "succeed create user",
             data: user
         },
         {
             status: 201
         }
     )
 } catch (error) {
    
    if(error instanceof z.ZodError){
        console.log(error);
        const errorPath = error.issues[0].path[0] 
        const errorMessage = error.issues[0].message 
        
        return NextResponse.json<MyResponse<never>>(
            {
                statusCode: 400,
                error: `${errorPath} - ${errorMessage}`,
              },
              {
                status: 400,
              },
        )
    }

    return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 500,
          message: "Internal Server Error !",
        },
        {
          status: 500,
        },
      );
    }
 }
