import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { User, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = Number((session.user as User)?.id);

  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const data = body;

    if (!data) {
      return NextResponse.json(
        { message: "data  compulsory" },
        { status: 400 }
      );
    }

    const newProduct = await prisma?.sales?.createMany({
      data: data.map((d) => ({
        productId: d.productId,
        userId,
        quantity: d.quantity ?? 1,
      })),
    });

    return NextResponse.json(
      { product: newProduct, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const id = req?.nextUrl?.searchParams?.get("id");
  if (id) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(product, { status: 200 });
    } catch (e) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    try {
      const products = await prisma.product.findMany();
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
