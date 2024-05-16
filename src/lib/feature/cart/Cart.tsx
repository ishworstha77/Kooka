"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { Button } from "@/components/ui/button";
import { getUserCart } from "@/utils/apiFunctions";
import { CartItem, Product } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";

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

  if (isLoading) {
    return <>Loading...</>;
  }

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
            <div
              key={item?.id}
              className="flex justify-between text-left gap-8"
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
            </div>
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
