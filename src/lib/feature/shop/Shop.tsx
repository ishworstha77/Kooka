"use client";

import { Button } from "@/components/ui/button";
import { getProducts, ProductData } from "@/utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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
    return <>Loading...</>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-8 mt-24">
      {productData?.data?.map((item: ProductData) => (
        <div
          key={item?.id}
          className="object-cover aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 group relative min-h-[224px] w-full   overflow-hidden rounded-lg "
        >
          <Image src={item?.image} alt={`${item}`} height={1000} width={1000} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
