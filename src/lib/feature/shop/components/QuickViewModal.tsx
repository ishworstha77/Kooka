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
import { ProductData } from "@/utils/apiFunctions";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const QuickViewModal = (props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: ProductData;
}) => {
  const { open, setOpen, selectedItem } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="flex gap-4 justify-between">
              <div className="flex flex-col gap-4">
                <p>{selectedItem?.name}</p>
                <p>${selectedItem?.price}</p>
                <p>{selectedItem?.description}</p>
                <div className="flex flex-col gap-2">
                  <p>Quantity</p>
                  <Input
                    defaultValue={1}
                    type="number"
                    className="w-20 bg-gray-300"
                  />
                </div>
                <Button variant="outline">Add to cart</Button>
                <p>View Full Item</p>
              </div>
              <Image
                src={selectedItem?.image}
                alt={selectedItem?.name}
                width={1000}
                height={1000}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
