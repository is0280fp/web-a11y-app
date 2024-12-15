import { SetStateAction, useState } from "react";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import Tooltip from "../components/tooltip";
import { useSortContext } from "../app/SortProvider";

export default function ArticleList() {
  const [copiedState, setCopiedState] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { sortedArticles } = useSortContext();
  return (
    <>
      <div className="flex flex-col gap-4">
        <>
          {sortedArticles?.map((article) => {
            return (
              <div
                className="bg-white rounded-lg shadow-md p-5"
                key={article.id}
              >
                <div className="flex flex-col items-left gap-2">
                  <div className="flex flex-row gap-1">
                    <img
                      src={article.icon}
                      alt=""
                      className="h-12 w-12 relative rounded-full overflow-hidden"
                    />
                    <div>
                      <div className="mt-1 text-sm text-gray-500">
                        {article.publishedAt}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        @{article.username}
                      </div>
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
                      <div className="mt-1 text-sm text-gray-500">
                        {article.likedCount}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `https://zenn.dev${article.path}`,
                          article.id,
                          setCopiedState
                        )
                      }
                    >
                      <div>
                        {copiedState[article.id] && (
                          <Tooltip message={"Copied"}></Tooltip>
                        )}
                        {copiedState[article.id] ? (
                          <CheckIcon className="h-6 w-6" />
                        ) : (
                          <ClipboardDocumentIcon className="h-6 w-6" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </>
  );
}

const copyToClipboard = async (
  copyTarget: string,
  articleId: number,
  setCopiedState: { (value: SetStateAction<{ [key: number]: boolean }>): void }
) => {
  try {
    await navigator.clipboard.writeText(copyTarget);
    setCopiedState((prevState) => ({ ...prevState, [articleId]: true }));
    const timeout = setTimeout(() => {
      setCopiedState((prevState) => ({ ...prevState, [articleId]: false }));
    }, 2000);
    return () => clearTimeout(timeout);
  } catch (error) {
    console.error("Failed to copy text: ", error);
  }
};
