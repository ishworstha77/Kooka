import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if(!session?.user) {
      return NextResponse.json({message: 'User not authenticated'},{status: 401})
    }
    try{
        const body = await req.json()
        const {name, description, price, images} = body
        
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
                price: Number(price),
                images
            }
        })

        return NextResponse.json({product: newProduct, message: 'Product created successfully'},{status: 201})
    } catch(error){
        return NextResponse.json({message: 'Something went wrong!!'},{status: 500})
    }
}

export async function GET(req: NextRequest) {
    const id = req?.nextUrl?.searchParams?.get('id')
    if(id){
        try {
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }

            return NextResponse.json(product, { status: 200 });
        } catch(e){
            return NextResponse.json({message: 'Something went wrong'},{status: 500})
        }
    } else {
        try {
            const products = await prisma.product.findMany();
            return NextResponse.json(products,{status: 200})
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong'},{status: 500})
    
        }
    }
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
    }

    try {
        const { productId, name, description, price, images } = await req.json()

        if (!productId || !name) {
            return NextResponse.json({ message: 'Product ID and name are required' }, { status: 400 })
        }

        const existingProduct = await prisma?.product.findUnique({ where: { id: productId } })

        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        const updatedProduct = await prisma?.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price: Number(price),
                images
            }
        })

        return NextResponse.json({ product: updatedProduct, message: 'Product updated successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if(!session?.user) {
      return NextResponse.json({message: 'User not authenticated'}, {status: 401})
    }
    
    try {
        const { productId } = await req.json()

        if (!productId) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 })
        }

        const existingProduct = await prisma?.product?.findUnique({ where: { id: productId } })

        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        await prisma?.productView?.deleteMany({ where: { productId } })
        await prisma?.product?.delete({ where: { id: Number(productId) } })

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
    } catch(error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
