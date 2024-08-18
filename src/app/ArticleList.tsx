import authors from "../authors.json";
import { fetchZennArticles } from "../api/fetchArticles";
import { SetStateAction, useEffect, useState } from "react";
import timeSince from "../utils/timeSince";
import dayjs from "dayjs";
import { ClipboardDocumentIcon, CheckIcon, HeartIcon } from "@heroicons/react/20/solid";
import Tooltip from "../components/tooltip";

export default function ArticleList() {
  return (
    <>
        <div className="flex flex-col gap-4">
          {authors.map((author) => {
            return <ArticleListCard authorId={author.authorId} key={author.authorId} />;
          })}
        </div>
    </>
  );
}

const copyToClipboard = async (copyTarget: string, articleId: number, setCopiedState: { (value: SetStateAction<{[key: number]: boolean}>): void; }) => {
  try {
    await navigator.clipboard.writeText(copyTarget);
    setCopiedState((prevState)=> ({...prevState, [articleId]: true}))
    const timeout = setTimeout(() => {
        setCopiedState((prevState)=> ({...prevState, [articleId]: false}))
      }, 2000);
    return () => clearTimeout(timeout)
  } catch (error) {
    console.error("Failed to copy text: ", error)
  }
};

type Article = {
  id: number;
  title: string;
  published_at: string;
  username: string;
  icon?: string;
  path: string;
  liked_count: number;
};

// titleなどを表示するコンポーネント
const ArticleListCard = (props: { authorId: string }) => {
  const [articles, setArticles] = useState<Article[] | undefined>([]);
  const [copiedState, setCopiedState] = useState<{[key: number]: boolean}>({});
  useEffect(() => {
    const dataFetch = async () => {
      const articleData = await fetchZennArticles(props.authorId);
      const filteredArticleData = articleData?.articles.map((article) => {
        return {
          id: article.id,
          title: article.title,
          published_at: `${timeSince(article.published_at)}`,
          username: article.user.username,
          icon: article.user.avatar_small_url,
          path: article.path,
          liked_count: article.liked_count,
        };
      });
      // DESC by number of liked_count
      // const orderedFilteredArticleData = filteredArticleData?.sort((a, b) => b.liked_count - a.liked_count)
      // ASC by number of published_at
      const orderedFilteredArticleData = filteredArticleData?.sort((a, b) => dayjs(b.published_at).isAfter(a.published_at) ? -1 : 1)
      setArticles(orderedFilteredArticleData);
    };
    dataFetch();
  }, []);

  return (
    <>
      {articles?.map((article) => {
        return (
          <div className="bg-white rounded-lg shadow-md p-5" key={article.id}>
            <div className="flex flex-col items-left gap-2">
              <div className="flex flex-row gap-1">
                <img
                  src={article.icon}
                  alt=""
                  className="h-12 w-12 relative rounded-full overflow-hidden"
                />
                <div>
                  <div className="mt-1 text-sm text-gray-500">{article.published_at}</div>
                  <div className="mt-1 text-sm text-gray-500">@{article.username}</div>
                </div>
              </div>
              <a
                href={`https://zenn.dev${article.path}`}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {article.title}
              </a>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 items-center">
                    <HeartIcon className="h-6 w-6" />
                    <div className="mt-1 text-sm text-gray-500">{article.liked_count}</div>
                </div>
                <button onClick={() => copyToClipboard(`https://zenn.dev${article.path}`, article.id, setCopiedState)}>
                    <div>
                    {copiedState[article.id] && <Tooltip message={"Copied"}></Tooltip>}
                    {copiedState[article.id] ? <CheckIcon className="h-6 w-6" /> : <ClipboardDocumentIcon className="h-6 w-6" />}
                    </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
