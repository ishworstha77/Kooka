import RecipeList from "@/lib/feature/recipe/RecipeList";
import { Footer } from "@/lib/feature/shared/Footer";
import Navbar from "@/lib/feature/shared/Navbar";
import StoryPage from "@/lib/feature/story/StoryPage";

export default function Recipes() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col p-2 md:px-8 md:py-4 gap-14 w-full max-w-screen-2xl">
        <Navbar />
        <RecipeList />
        <Footer />
      </div>
    </main>
  );
}
