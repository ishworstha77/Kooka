"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export const AddProductModal = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const response = await axios.post("/api/product", {
      ...getValues(),
      price: Number(getValues()?.price),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {" "}
        {/* <Button size="sm" className="h-7 gap-1"> */}
        <div className="flex gap-1 items-center">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-1">
                  <p>Enter product name</p>
                  <Input {...register("name")} />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Enter product description</p>
                  <Textarea {...register("description")} />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Enter price</p>
                  <Input type="number" {...register("price")} />
                </div>
                <Button>Submit</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
