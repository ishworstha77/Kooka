"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
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
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const AddProductModal = () => {
  const bucket = "images";
  const [image, setImage] = useState("");
  const supabase = createClientComponentClient();

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const addProject = async (data: any) => {
    const res = await axios.post(`/api/product`, data);
    return res;
  };

  const { mutate } = useMutation({
    mutationFn: addProject,

    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      // Perform actions upon successful mutation
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const randomNo = uuidv4();
    const image = e?.target?.files;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${randomNo}-${image[0]?.name}`, image[0]);

    if (data) {
      setImage(
        `${process.env["NEXT_PUBLIC_SUPABASE_URL"]}/storage/v1/object/public/${bucket}/${data?.path}`
      );
    }
    if (error) {
      console.error(error?.message);
    }
  };

  const onSubmit = async () => {
    mutate({
      ...getValues(),
      image: image,
      price: Number(getValues()?.price),
    });
  };
  const onSubmitDebounced = debounce(onSubmit, 2000);

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
            <form onSubmit={handleSubmit(onSubmitDebounced)}>
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
                <div className="flex flex-col gap-1">
                  <p>Upload Image</p>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={(e) => onImageUpload(e)}
                  />
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
