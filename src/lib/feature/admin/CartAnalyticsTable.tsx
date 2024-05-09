"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter, MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";
import AddProductModal from "./AddProductModal";
import { getAllCart, getProducts, getProjectView } from "@/utils/apiFunctions";
import { CartItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProductData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  price: number;
  totalSales: number;
  isActive: boolean;
  images: string[];
}

interface TableData {
  productId: number;
  product: Product;
  count: number;
}

export const CartAnalyticsTable = () => {
  const [tableData, setTableData] = useState<TableData[]>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllCart"],
    queryFn: getAllCart,
  });

  const cartDataArray = data?.data?.cartItems;

  useEffect(() => {
    // First, let's create a map to count occurrences of each product
    const productCountMap: Record<string, number> = {};
    cartDataArray?.forEach((item: CartItem) => {
      const productId = item.productId;
      productCountMap[productId as unknown as keyof typeof productCountMap] =
        (productCountMap[productId] || 0) + 1;
    });

    // Now, let's create the desired output array
    const resultArray: TableData[] = [];
    cartDataArray?.forEach(
      (item: { productId: number; productItem: Product }) => {
        const productId = item.productId;
        // Check if we have already added this product to the result array
        if (!resultArray.some((element) => element.productId === productId)) {
          // If not added, then add it along with its count
          const productObject = {
            productId: productId,
            product: item?.productItem,
            count: productCountMap[productId],
          };
          resultArray.push(productObject);
        }
      }
    );
    setTableData(resultArray);
  }, [JSON.stringify(cartDataArray)]);

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <AddProductModal />
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Product Intrests</CardTitle>
              <CardDescription>No of Products added to cart.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Cart count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData?.map?.((item) => (
                    <TableRow key={item?.productId}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={item?.product?.images?.[0] || ""}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item?.productId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item?.product?.name}
                      </TableCell>

                      <TableCell>{item?.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};
