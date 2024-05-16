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
import { getProductView, getProducts } from "@/utils/apiFunctions";
import { Product, ProductView } from "@prisma/client";

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

export const AnalyticsTable = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProductsView"],
    queryFn: getProductView,
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
              <CardTitle>Views</CardTitle>
              <CardDescription>No of views of products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>No of views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map?.(
                    (item: ProductView & { product: Product }) => (
                      <TableRow key={item?.id}>
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
                          {item?.product?.name}
                        </TableCell>

                        <TableCell>{item?.noOfViews}</TableCell>
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
            <ApexChart />
          </Card>
        </TabsContent>
        <TabsContent value="pie">
          <Card>
            <div className="max-w-screen-lg">
              <PieChart />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

const ApexChart = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProductsView"],
    queryFn: getProductView,
  });

  const formula = data?.data?.reduce((obj, curr) => {
    return {
      [curr.product?.id]: {
        name: curr.product.name,
        data: [...(obj?.[curr.product?.id]?.data ?? []), curr.noOfViews],
      },
      ...(obj ?? {}),
    };
  }, {});

  console.log("formula", formula);
  const options = {
    xaxis: {
      categories: data.data?.map((d) => d.product?.name),
    },
  };
  const series = [
    {
      name: "series-1",
      data: data.data?.map((d) => d.noOfViews),
    },
  ];

  return <Chart options={options} series={series} type="bar" />;
};

const PieChart = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProductsView"],
    queryFn: getProductView,
  });

  const formula = data?.data?.reduce((obj, curr) => {
    return {
      [curr.product?.id]: {
        name: curr.product.name,
        data: [...(obj?.[curr.product?.id]?.data ?? []), curr.noOfViews],
      },
      ...(obj ?? {}),
    };
  }, {});

  console.log("formula", formula);
  const options = {
    xaxis: {
      categories: data.data?.map((d) => d.product?.name),
    },
    chart: {
      width: 50,
      type: "pie",
    },
    labels: data?.data?.map((d) => d.product?.name),
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
  const series = data.data?.map((d) => d.noOfViews);

  return <Chart options={options} series={series} type="pie" />;
};
