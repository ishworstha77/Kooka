import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma?.user?.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials?.password,
          existingUser?.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser?.id}`,
          name: existingUser?.name,
          email: existingUser?.email,
          role: existingUser?.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u?.id,
          name: u?.name,
          email: u?.email,
          role: u?.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      const existingUser = await prisma?.user?.findUnique({
        where: { email: session?.user?.email },
      });
      return {
        ...session,
        user: {
          ...session?.user,
          ...existingUser,
          id: token?.id,
        },
      };
    },
  },
};
