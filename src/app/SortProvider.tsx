import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FunctionComponent,
  ReactNode,
} from "react";
import timeSince from "../utils/timeSince";
import { fetchZennArticles } from "../api/fetchArticles";

interface SortContextProps {
  sortBy: "date" | "likes";
  setSortBy: (sortKey: "date" | "likes") => void;
  sortedArticles: Article[];
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [sortBy, setSortBy] = useState<"date" | "likes">("date");
  const [sortedArticles, setsortedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const dataFetch = async () => {
      const articleData = await fetchZennArticles("yusukehirao");
      const filteredArticleData = articleData?.articles.map((article) => {
        return {
          id: article.id,
          title: article.title,
          publishedAt: `${timeSince(article.published_at)}`,
          username: article.user.username,
          icon: article.user.avatar_small_url,
          path: article.path,
          likedCount: article.liked_count,
        };
      });
      const sortedArticles = filteredArticleData?.sort((a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        }
        return b.likedCount - a.likedCount;
      });
      setsortedArticles(sortedArticles);
    };
    dataFetch();
  }, [sortBy]);

  return (
    <SortContext.Provider value={{ sortBy, setSortBy, sortedArticles }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};
