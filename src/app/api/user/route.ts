import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const existingUserByEmail = await prisma?.user?.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "user with this email already exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma?.user?.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, mesage: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { mesage: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
