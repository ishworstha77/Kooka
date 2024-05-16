"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { Button } from "@/components/ui/button";
import { getUserCart } from "@/utils/apiFunctions";
import { CartItem, Product } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { deleteCart, getAllCart } from "@/utils/apiFunctions";
import { toast } from "@/components/ui/use-toast";
import { Loader, XIcon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Cart = () => {
  const [total, setTotal] = useState(0);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCart"],
    queryFn: getUserCart,
  });

  useEffect(() => {
    let total = 0;
    data?.data?.cartItems?.forEach(
      (item: CartItem & { productItem: Product }) => {
        // Multiply quantity by price and add to total
        total += item?.quantity * item?.productItem?.price;
      }
    );
    setTotal(total);
  }, [JSON.stringify(data)]);

  const handleCart = async () => {
    // step 1: load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // step 2: define the data for monthly subscription
    const body: CheckoutSubscriptionBody = {
      interval: "month",
      amount: total,
      plan: "Monthly",
      planDescription: "Subscribe for $20 per month",
    };

    // step 3: make a post fetch api call to /checkout-session handler
    const result = await fetch("/checkout-sessions", {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });

    // step 4: get the data and redirect to checkout using the sessionId
    const data = (await result.json()) as Stripe.Checkout.Session;
    const sessionId = data.id!;
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-semibold mb-8 text-primary-500">
        Shopping Cart
      </p>
      <div className="flex flex-col gap-4">
        {data?.data?.cartItems?.map(
          (item: CartItem & { productItem: Product }) => (
            <CartDetails item={item} key={item.id} />
          )
        )}
        <div className="border-t border-gray-400 my-4" />
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-8">
            <p className="text-2xl">Total</p>
            <p className="text-xl">${total}</p>
          </div>
          <Button onClick={handleCart}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

function CartDetails({ item }: { item: CartItem & { productItem: Product } }) {
  const queryClient = useQueryClient();

  const { mutate: deleteCartMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteCart,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      // Perform actions upon successful mutation
      toast({
        title: "Success",
        description: "Cart Item deleted successfully",
      });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage = error?.response?.data?.message;
      toast({
        title: "Error",
        description: errorMessage,
      });
    },
  });
  return (
    <div
      key={item?.id}
      className="flex justify-between text-left gap-8 items-center"
    >
      <Image
        src={item?.productItem?.images?.[0]}
        alt="product"
        height={200}
        width={200}
      />
      <p>{item?.productItem?.name}</p>
      <p>{item?.quantity}</p>
      <p>${item?.productItem?.price}</p>
      <button
        className=" rounded-full w-8 flex justify-center items-center h-8 hover:bg-slate-200 text-slate-400 hover:text-slate-700"
        onClick={() => {
          deleteCartMutate({ cartId: item.id });
        }}
      >
        {isDeleting ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <XIcon className="text-slate-400 hover:text-slate-800" />
        )}
      </button>
    </div>
  );
}
