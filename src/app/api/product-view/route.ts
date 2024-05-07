import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json()
        const {productId} = body
    
        // Check if the product view record exists
        let productView = await prisma.productView.findUnique({
            where: {
            productId: parseInt(productId),
            },
        });
    
        if (!productView) {
            // If product view doesn't exist, create a new one
            productView = await prisma.productView.create({
                data: {
                    productId: parseInt(productId),
                    noOfViews: 1,
                },
            });
            return NextResponse.json({product: productView, message: 'Product view count created'},{status: 201})
        } else {
            // If product view exists, increment the view count
            productView = await prisma.productView.update({
                where: {
                    productId: parseInt(productId),
                },
                data: { 
                    noOfViews: {
                    increment: 1,
                    },
                },
            });
            return NextResponse.json({product: productView, message: 'Product view count upadted'},{status: 201})
        }
    } catch(error){
        return NextResponse.json({message: 'Something went wrong!!'},{status: 500})
    }
    
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if(!session?.user) {
        return NextResponse.json({message: 'User not authenticated'},{status: 401})
    }
    try {
        const productView = await prisma.productView.findMany({
            include: {
                product: true
            }
        });
        return NextResponse.json(productView,{status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong'},{status: 500})

    }
}



