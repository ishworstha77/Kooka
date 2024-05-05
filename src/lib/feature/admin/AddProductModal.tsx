"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { ProductAddData, addProject } from "@/utils/apiFunctions";

const formDefaultValues = {
  name: "",
  description: "",
  price: 0,
  images: [{}],
};

export const AddProductModal = () => {
  const bucket = "images";
  const [images, setImages] = useState<string[]>([]);
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formDefaultValues,
  });

  const {
    fields: imageFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "images",
  });

  const { mutate } = useMutation({
    mutationFn: addProject,

    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      reset(formDefaultValues);
      // Perform actions upon successful mutation
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage = error?.response?.data?.message;
      toast({
        title: "Error",
        description: errorMessage,
      });
    },
  });

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const randomNo = uuidv4();
    const image = e?.target?.files;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${randomNo}-${image[0]?.name}`, image[0]);
    if (data) {
      setImages([
        ...images,
        `${process.env["NEXT_PUBLIC_SUPABASE_URL"]}/storage/v1/object/public/${bucket}/${data?.path}`,
      ]);
    }
    if (error) {
      console.error(error?.message);
    }
  };

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();
    mutate({
      ...getValues(),
      images: images,
    } as unknown as ProductAddData);
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
            <form>
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
                <div className="flex flex-col gap-2">
                  <p>Upload Image</p>
                  <div className="flex flex-col gap-4">
                    {imageFields.map((_, index) => (
                      <div key={index}>
                        <div className="flex flex-col gap-1">
                          <input
                            accept="image/*"
                            type="file"
                            onChange={(e) => onImageUpload(e)}
                            multiple
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            let imagesAfterRemoval = [...images];
                            imagesAfterRemoval.splice(index, 1);

                            setImages(imagesAfterRemoval);

                            remove(index);
                          }}
                        >
                          Remove Image
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-fit mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      append({});
                    }}
                  >
                    Add More Images
                  </Button>
                </div>

                <Button
                  disabled={imageFields?.length !== images?.length}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
