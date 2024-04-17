import Image from "next/image";

export const Shop = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-8 mt-24">
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
        <Image
          key={item}
          src={`/breadcrumb/breadcrumb${item}.png`}
          alt={`${item}`}
          height={1000}
          width={1000}
        />
      ))}
    </div>
  );
};

export default Shop;
