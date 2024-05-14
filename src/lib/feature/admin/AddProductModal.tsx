"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import {
  ProductAddData,
  addProduct,
  getProduct,
  updateProduct,
} from "@/utils/apiFunctions";
import { Product } from "@prisma/client";

const formDefaultValues = {
  name: "",
  description: "",
  price: 0,
  images: [{}],
};

export const AddProductModal = (props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedProduct: number;
  setSelectedProduct: Dispatch<SetStateAction<number>>;
}) => {
  const { open, setOpen, selectedProduct, setSelectedProduct } = props;

  const bucket = "images";
  const [images, setImages] = useState<string[]>([]);
  const supabase = createClientComponentClient();
  const { toast } = useToast();

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
  console.log("hello", getValues(), images);

  const {
    fields: imageFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getProducts", selectedProduct],
    queryFn: ({ queryKey }) => getProduct(queryKey[1] as number),
    enabled: !!selectedProduct,
  });

  const productDataObj = productData?.data as Product;

  useEffect(() => {
    if (productDataObj) {
      reset({
        name: productDataObj?.name,
        description: productDataObj?.description,
        price: productDataObj?.price,
        images: productDataObj?.images?.map((_) => ({})),
      });
      setImages([...productDataObj?.images]);
    }
  }, [JSON.stringify(productDataObj)]);

  const { mutate: addProductMutate } = useMutation({
    mutationFn: addProduct,

    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      setOpen(false);
      setSelectedProduct(null);
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

  const { mutate: updateProductMutate } = useMutation({
    mutationFn: updateProduct,

    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setOpen(false);
      setSelectedProduct(null);
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
    if (selectedProduct) {
      e.preventDefault();
      updateProductMutate({
        productId: selectedProduct,
        ...getValues(),
        images: images,
      } as unknown as ProductAddData & { productId: number });
    } else {
      e.preventDefault();
      addProductMutate({
        ...getValues(),
        images: images,
      } as unknown as ProductAddData);
    }
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
        <DialogClose
          onClick={() => {
            setSelectedProduct(null);
            setOpen(false);
            reset(formDefaultValues);
          }}
        >
          <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
          </div>
        </DialogClose>
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
                            accept=".jpg, .jpeg, .png"
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
                  className="w-full hover:bg-black"
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
