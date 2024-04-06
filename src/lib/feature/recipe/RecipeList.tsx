import Image from "next/image";

const recipeItemsArray = [
  {
    id: 1,
    image: "/receipe/crispy-air-fryer.jpeg",
    imageAlt: "crispy air fryer",
    date: "15 JUNE 2022",
    title: "CRISPY AIR FRYER PARMESAN ZUCCHINI FRIES",
    description:
      "You’ve got to try these delicious healthy Zucchini Fries … You wont beable to take your hand off them!! Read More",
  },
  {
    id: 2,
    image: "/receipe/crispy-baked-mac.jpeg",
    imageAlt: "crispy baked mac",
    date: "11 MAY 2021",
    title: "CRISPY BAKED MAC AND CHEESE",
    description:
      "Try this delicious cheesey pasta bake for dinner tonight. It’s super easy to make and can be ready in an hour! Read More",
  },
  {
    id: 3,
    image: "/receipe/salty-cod.jpeg",
    imageAlt: "salt cod",
    date: "2 FEBURARY 2021",
    title: "SALT COD CROQUETTE WITH AIOLI",
    description:
      "Check out this scrumptious recipe, a great appetizer for your guests this weekend!! Read More",
  },
  {
    id: 4,
    image: "/receipe/garlic-butter-stuffed-chicken.jpeg",
    imageAlt: "garlic butter stuffed chicken",
    date: "23 JUNE 2020",
    title:
      "GARLIC BUTTER STUFFED CHECKEN WITH MASHED POTATO AND STEAMED GREENS",
    description:
      "Mmmmm … this juicy recipe is a great quick and easy meal for the family one night this week!! Read More",
  },
  {
    id: 5,
    image: "/receipe/quick-crumb-fish.jpeg",
    imageAlt: "quick crumb fish",
    date: "1 May 2020",
    title: "QUICK CRUMBED FISH THAT KIDS WILL LOVE!",
    description:
      "In need of a tasty and healthy meal for the family … well this is it, crunchy and flavoursome fish that will have everyone wanting more!! Read More",
  },
  {
    id: 6,
    image: "/receipe/best-chicken-parmigiana.jpeg",
    imageAlt: "best chicken parmigiana",
    date: "24 april 2020",
    title: "THE BEST CHICKEN PARMIGIANA",
    description: "",
  },
  {
    id: 7,
    image: "/receipe/crunchy-arancini-balls.jpeg",
    imageAlt: "crunchy arancini balls",
    date: "13 March 2020",
    title: "CRUNCHY ARANCINI BALLS",
    description: "",
  },
  {
    id: 8,
    image: "/receipe/mediterreanPork.jpg",
    imageAlt: "Meditterrean pork",
    date: "20 september 2019",
    title: "MEDITERRANEAN PORK SCHNITZEL AND ROCKET PEAR SALAD",
    description: "",
  },
  {
    id: 9,
    image: "/receipe/salt-pepper-squid.jpg",
    imageAlt: "salt pepper squid",
    date: "25 JUNE 2019",
    title: "SALT AND PEPPER SQUID",
    description:
      "Check out this scrumptious recipe for Salt & Pepper Squid which is so easy to make using our Kookakrumb Salt Pepper Squid Packet! Read More",
  },
  {
    id: 10,
    image: "/receipe/crunchy-herb.jpg",
    imageAlt: "crunchy herb",
    date: "25 JUNE 2019",
    title: "CRUNCHY HERB AND GARLIC CHICKEN SCHNITZEL",
    description:
      "This is a great simple recipe that can turn an average chicken meal into a gourmet delight! Read More",
  },
];

interface RecipeItemProps {
  image: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
}

const RecipeItemComponent = (props: { item: RecipeItemProps }) => {
  const { item } = props;
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={item?.image}
        alt={item?.imageAlt}
        height={1000}
        width={1000}
      />
      <p className="text-xs text-gray-500">{item?.date}</p>
      <p className="text-primary text-3xl">{item?.title}</p>
      <p>{item?.description}</p>
    </div>
  );
};

export const RecipeList = () => {
  return (
    <div className="flex flex-col gap-16">
      {recipeItemsArray?.map((item) => (
        <RecipeItemComponent key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default RecipeList;
