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
import Chart from "react-apexcharts";

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

import { useQuery } from "@tanstack/react-query";
import { getProductView, getProducts, getSales } from "@/utils/apiFunctions";
import { Product, ProductView, Sales, User } from "@prisma/client";
import { AvatarImage } from "@/components/ui/avatar";

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

export const SalesPage = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getSales"],
    queryFn: getSales,
  });

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="table">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="bar">Bar Graph</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
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
          </div>
        </div>
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>No of Sales of products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Bought By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map?.(
                    (item: Sales & { productItem: Product; user: User }) => (
                      <TableRow key={item?.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={item?.productItem?.images?.[0] || ""}
                            width="64"
                          />
                        </TableCell>

                        <TableCell className="font-medium">
                          {item?.productItem?.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item?.quantity}
                        </TableCell>

                        <TableCell>{item?.productItem?.price}</TableCell>
                        <TableCell>
                          {item?.productItem?.price * item?.quantity}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <p className="text-md text-black">
                              {item?.user?.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {item?.user?.email}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
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
        <TabsContent value="bar">
          <Card>
            <ApexChart data={data.data} />
          </Card>
        </TabsContent>
        <TabsContent value="pie">
          <Card>
            <div className="max-w-screen-lg">
              <PieChart data={data.data} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

const ApexChart = ({
  data,
}: {
  data: Array<Sales & { productItem: Product; user: User }>;
}) => {
  const groupedData = data.reduce((obj, curr) => {
    return {
      ...obj,
      [curr.productId]: {
        name: curr.productItem?.name,
        quantity: (obj[curr.productId]?.quantity ?? 0) + curr.quantity,
      },
    };
  }, {});

  const groupedArr = Object.values(groupedData);
  const options = {
    xaxis: {
      categories: groupedArr?.map((d) => d.name),
    },
  };
  const series = [
    {
      name: "series-1",
      data: groupedArr?.map((d) => d.quantity),
    },
  ];

  return <Chart options={options} series={series} type="bar" />;
};

const PieChart = ({
  data,
}: {
  data: Array<Sales & { productItem: Product; user: User }>;
}) => {
  const groupedData = data.reduce((obj, curr) => {
    return {
      ...obj,
      [curr.productId]: {
        name: curr.productItem?.name,
        quantity: (obj[curr.productId]?.quantity ?? 0) + curr.quantity,
      },
    };
  }, {});

  const groupedArr = Object.values(groupedData);

  const options = {
    xaxis: {
      categories: groupedArr?.map((d) => d?.name),
    },
    chart: {
      width: 50,
      type: "pie",
    },
    labels: groupedArr?.map((d) => d?.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 50,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = groupedArr?.map((d) => d.quantity);

  // return <div>fuck you</div>;

  return <Chart options={options} series={series} type="pie" />;
};
