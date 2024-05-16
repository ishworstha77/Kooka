import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CartItem, User } from "@prisma/client";
import { getServerSession } from "next-auth";
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
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "productId and quantity are compulsory" },
        { status: 409 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const existingCartItem = await prisma?.cartItem?.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      await prisma?.cartItem?.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      await prisma?.cartItem?.create({
        data: {
          // user: { connect: { id: userId } },
          // product: { connect: { id: productId } },
          userId,
          productId,
          quantity,
        } as unknown as CartItem,
      });
    }

    return NextResponse.json(
      { message: "Product added to cart successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = Number((session?.user as User)?.id);
  const type = req?.nextUrl?.searchParams?.get("type");

  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  if (type === "user") {
    try {
      const cartItems = await prisma?.cartItem?.findMany({
        where: {
          userId: userId,
        },
        include: {
          productItem: true,
        },
      });

      return NextResponse.json({ cartItems });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    try {
      const cartItems = await prisma?.cartItem?.findMany({
        include: {
          productItem: true,
        },
      });

      return NextResponse.json({ cartItems });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { cartId } = await req.json();

    if (!cartId) {
      return NextResponse.json(
        { message: "CartId ID is required" },
        { status: 400 }
      );
    }

    const existingCart = await prisma?.cartItem?.findUnique({
      where: { id: cartId },
    });

    if (!existingCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    await prisma?.cartItem?.delete({ where: { id: Number(cartId) } });

    return NextResponse.json(
      { message: "Cart deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Something went wrong: Either product is in cart or there is network error ",
      },
      { status: 500 }
    );
  }
}
