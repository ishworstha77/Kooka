"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ProductData, addToCart, setProductView } from "@/utils/apiFunctions";
import { useMutation } from "@tanstack/react-query";
import Image from "@/components/ui/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const QuickViewModal = (props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: ProductData;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { open, setOpen, selectedItem } = props;

  const { mutate } = useMutation({
    mutationFn: setProductView,
  });

  const { mutate: addToCartMutate } = useMutation({
    mutationFn: addToCart,

    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
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

  useEffect(() => {
    if (selectedItem?.id) {
      mutate({
        productId: selectedItem?.id,
      });
    }
  }, [selectedItem?.id]);

  const addToCartHandler = () => {
    addToCartMutate({
      productId: selectedItem?.id,
      quantity: quantity,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogDescription>
            <div className="flex gap-4">
              <div className="w-[40%]">
                <div className="flex flex-col gap-4">
                  <p className="text-lg truncate text-ellipsis text-black font-bold">
                    {selectedItem?.name}
                  </p>
                  <p>${selectedItem?.price}</p>
                  <p className="text-xs leading-8">
                    {selectedItem?.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <p>Quantity</p>
                    <Input
                      defaultValue={1}
                      type="number"
                      className="w-20 bg-gray-300"
                      onChange={(e) => setQuantity(Number(e?.target?.value))}
                    />
                  </div>
                  <Button variant="outline" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                  <p>View Full Item</p>
                </div>
              </div>
              <div className="w-[60%] h-[500px]">
                <div className={`relative h-[400px] w-full`}>
                  <Image
                    alt="Product"
                    fill
                    className="object-cover"
                    src={selectedItem?.images?.[0]}
                  />
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
