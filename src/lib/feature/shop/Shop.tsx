"use client";

import { Button } from "@/components/ui/button";
import { getProducts, ProductData } from "@/utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import Image from "@/components/ui/image";
import { useState } from "react";
import QuickViewModal from "./components/QuickViewModal";

export const Shop = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductData>();
  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["getProducts"], queryFn: getProducts });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-4 mt-24">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-8 mt-24">
      {productData?.data?.map((item: ProductData) => (
        <div
          key={item?.id}
          className="object-cover aspect-w-1 cursor-pointer aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 group relative h-px] w-full  overflow-hidden rounded-lg "
        >
          <div className={`relative h-[400px] w-full`}>
            <Image
              alt="Product"
              src={item?.images?.[0] || ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(true);
                setSelectedItem(item);
              }}
            >
              Quick View
            </Button>
          </div>
        </div>
      ))}
      <QuickViewModal
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Shop;

function ProductSkeleton() {
  return (
    <div className="border border-slate-300 shadow rounded-md p-4  w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-full bg-slate-200 min-h-[400px] rounded"></div>
        </div>
      </div>
    </div>
  );
}
