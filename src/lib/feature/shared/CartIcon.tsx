"use client";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCart } from "@/utils/apiFunctions";
function CartIcon() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCart"],
    queryFn: getUserCart,
  });
  console.log("data", data);

  const cartCount =
    data?.data?.cartItems?.reduce(
      (tot, curr) => tot + curr?.quantity ?? 1,
      0
    ) ?? 0;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart />
      {!!cartCount && (
        <div className="w-5 h-5 bg-slate-300 rounded-full flex items-center justify-center absolute -bottom-1 -right-1 text-xs">
          {cartCount}
        </div>
      )}
    </Link>
  );
}

export default CartIcon;
