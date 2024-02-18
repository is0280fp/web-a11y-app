import authors from '../authors.json'
import { fetchZennArticles } from '../api/fetchArticles'
import { useEffect, useState } from 'react'
import timeSince from '../utils/timeSince'
import {ClipboardDocumentIcon} from '@heroicons/react/20/solid'
import {CheckIcon} from '@heroicons/react/20/solid'

export default function ArticleList() {
    return (<>
        <div className="container mx-auto px-5">
            <div className="flex flex-col gap-4">
                {authors.map((author) => {
                    return <ArticleListCard authorId={author.authorId} key={author.authorId}/>
                })}
            </div>
        </div>
    </>)
}

const copyToClipboard = async (copyTarget : string) => {
    try {
        await navigator.clipboard.writeText(copyTarget);
        console.log('Text copied to clipboard');    
      } catch (error) {
        console.error('Failed to copy text: ', error);
      }
  };

type Article = {
    id: number
    title: string
    published_at: string
    username: string,
    icon?: string,
    path: string
    liked_count: number
}

// titleなどを表示するコンポーネント
const ArticleListCard = (props: { authorId: string}) => {
    const [articles, setArticles] = useState<Article[] | undefined>([])
    useEffect(() => {
        const dataFetch = async () => {
            const articleData = await fetchZennArticles(props.authorId)
            const filteredArticleData =  articleData?.articles.map((article) => {
                return {
                    id: article.id,
                    title: article.title,
                    published_at: `${timeSince(article.published_at)}`,
                    username: article.user.username,
                    icon: article.user.avatar_small_url,
                    path: article.path,
                    liked_count: article.liked_count
                }
            })
            setArticles(filteredArticleData)
        }
        dataFetch()
    })
 
    return (<>
        {articles?.map((article) => {
            return (
                <div className="bg-white rounded-lg shadow-md p-5" key={article.id}>
                    <div className="flex flex-col items-left">
                        <a href={`https://zenn.dev/${article.path}`} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                            {article.title}    
                        </a>
                        <div className="mt-1 text-sm text-gray-500">{article.published_at}</div>
                        <div className="mt-1 text-sm text-gray-500">{article.username}</div>
                        <img src={article.icon} alt="" className='relative mx-auto rounded-full overflow-hidden'/>
                        <div className="mt-1 text-sm text-gray-500">{article.liked_count}</div>
                        <button onClick={() => copyToClipboard(`https://zenn.dev/${article.path}`)}>
                            <p>copy</p>
                            <ClipboardDocumentIcon className='h-6 w-6'/>
                            <p>copied</p>
                            <CheckIcon className='h-6 w-6'/>
                        </button>
                    </div>
                </div>)
        })}
    </>)
}