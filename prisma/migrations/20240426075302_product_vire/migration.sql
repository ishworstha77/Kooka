-- CreateTable
CREATE TABLE "ProductView" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "noOfViews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductView" ADD CONSTRAINT "ProductView_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
