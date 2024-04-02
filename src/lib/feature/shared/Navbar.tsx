import Image from "next/image";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-4">
        <div className="flex flex-1 justify-center items-center">
          <Image
            src="/kookaKrumb.ico"
            alt="kookakrumb"
            height={100}
            width={100}
          />
        </div>
        <ShoppingCart />
        <div className="md:hidden">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>About</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
                <DropdownMenuItem>Blog</DropdownMenuItem>
                <DropdownMenuItem>Blog</DropdownMenuItem>
                <DropdownMenuItem>Blog</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-20 items-center">
          <div className="hidden md:block">
            <div className="flex gap-12 ">
              <p className="text-gray-700 font-semibold">OUR STORY</p>
              <p className="text-gray-700 font-semibold">OUR BREADCRUMBS</p>
              <p className="text-gray-700 font-semibold">SHOP</p>
              <p className="text-gray-700 font-semibold">RECEIPES</p>
              <p className="text-gray-700 font-semibold">STOCKISTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
