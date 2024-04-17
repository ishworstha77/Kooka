import Image from "next/image";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignoutButton } from "./SignoutButton";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-4">
        <div className="flex flex-1 justify-center items-center">
          <Link href="/">
            <Image
              src="/kookaKrumb.ico"
              alt="kookakrumb"
              height={100}
              width={100}
            />
          </Link>
        </div>
        <ShoppingCart />
        <div className="md:hidden">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/story">OUR STORY</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/our-breadcrumb">OUR BREADCRUMBS</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/shop">SHOP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/recipes">RECEIPES</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/recipes">STOCKISTS</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {session?.user ? <SignoutButton /> : <Link href="/login">Sign In</Link>}
      </div>
      <div className="flex justify-center">
        <div className="flex gap-20 items-center">
          <div className="hidden md:block">
            <div className="flex gap-12 ">
              <Link href="/story">
                <p className="text-primary font-semibold">OUR STORY</p>
              </Link>
              <Link href="/our-breadcrumb">
                <p className="text-primary font-semibold">OUR BREADCRUMBS</p>
              </Link>
              <Link href="/shop">
                <p className="text-primary font-semibold">SHOP</p>
              </Link>
              <Link href="/recipes">
                <p className="text-primary font-semibold">RECEIPES</p>
              </Link>
              <Link href="/stocklist">
                <p className="text-primary font-semibold">STOCKISTS</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
