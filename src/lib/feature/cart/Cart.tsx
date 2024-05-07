"use client";

import { Button } from "@/components/ui/button";
import { getCart } from "@/utils/apiFunctions";
import { CartItem, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const Cart = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });
  let total = 0;

  data?.data?.cartItems?.forEach(
    (item: CartItem & { productItem: Product }) => {
      // Multiply quantity by price and add to total
      total += item?.quantity * item?.productItem?.price;
    }
  );
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-semibold mb-8">Shopping Cart</p>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-8">
          <p>Image</p>
          <p>Name</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        {data?.data?.cartItems?.map(
          (item: CartItem & { productItem: Product }) => (
            <div key={item?.id} className="flex justify-between gap-8">
              <Image
                src={item?.productItem?.images?.[0]}
                alt="product"
                height={200}
                width={200}
              />
              <p>{item?.productItem?.name}</p>
              <p>{item?.quantity}</p>
              <p>${item?.productItem?.price}</p>
            </div>
          )
        )}
        <div className="border-t border-gray-400 my-4" />
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-8">
            <p className="text-2xl">Total</p>
            <p className="text-xl">${total}</p>
          </div>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
