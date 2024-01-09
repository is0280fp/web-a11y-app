import authors from '../authors.json'
import { fetchZennArticles } from '../utils/fetchArticles'
import { useState } from 'react'

export default function ArticleList() {
    return (<>
        <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {authors.map((author) => {
                    return <ArticleListCard authorId={author.authorId} />
                })}
            </div>
        </div>
    </>)
}

// titleなどを表示するコンポーネント
const ArticleListCard = (props: { authorId: string}) => {
    const [articles, setArticles] = useState<Article[]>([])
    setArticles(getAriticles(props.authorId))
    return (<>
        {articles.map((article) => {
            return <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex flex-col items-center">
                <a href={'https://zenn.dev/' + article.path} className="w-20 h-20 rounded-full">
                    {article.title}    
                </a>
                <div className="mt-1 text-sm text-gray-500">{article.published_at}</div>
                <div className="mt-1 text-sm text-gray-500">{article.body_update_at}</div>
                <div className="mt-1 text-sm text-gray-500">{article.like_count}</div>
            </div>
        </div>
        })}
    </>)
}

type Article = {
    title: string
    published_at: string
    body_update_at: string
    path: string
    like_count: number
}

// エラーハンドリングをする
const getAriticles = (authorId: string): Article[] => {
    const json = fetchZennArticles(authorId)
    json.then((articles) => {
        return articles.map((article) => {
            return {
                title: article.title,
                published_at: article.published_at,
                body_update_at: article.body_updated_at,
                path: article.path,
                like_count: article.like_count
            }
        })
    }
}