import Filter from "../components/Filter";
import ArticleList from "./ArticleList";

export default function Home() {
  return (
      <div className="container mx-auto p-5 gap-4">
        <div className="flex flex-row justify-end">
          <Filter></Filter>
        </div>
        <ArticleList />
      </div>
  );
}
