import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await getServerSession()

    if(!session?.user) {
      return NextResponse.json({mesage: 'User not authenticated'},{status: 401})
    }
    try{
        debugger
        const body = await req.json()
        const {name, description, price} = body
        
        if(!name){
            return NextResponse.json({ message: 'product name compulsory'}, {status: 409})
        }

        const existingProductByName = await prisma?.product?.findUnique({where: {name: name}})

        if(existingProductByName){
            return NextResponse.json({ message: 'this product already exist'}, {status: 409})
        }

        const newProduct = await prisma?.product?.create({
            data: {
                name,
                description,
                price
            }
        })

        return NextResponse.json({product: newProduct, mesage: 'Product created successfully'},{status: 201})
    } catch(error){
        return NextResponse.json({mesage: 'Something went wrong!!'},{status: 500})
    }
}

export async function GET() {
    const session = await getServerSession();

    if (!session?.user) {
        return NextResponse.json({mesage: 'User not authenticated'},{status: 401})
    }

    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products,{status: 200})
    } catch (error) {
        return NextResponse.json({mesage: 'Something went wrong'},{status: 500})

    }
}
