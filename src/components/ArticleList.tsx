import authors from '../authors.json'
import { fetchZennArticles } from '../utils/fetchArticles'
import { useEffect, useState } from 'react'

export default function ArticleList() {
    return (<>
        <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {authors.map((author) => {
                    return <ArticleListCard authorId={author.authorId} key={author.authorId}/>
                })}
            </div>
        </div>
    </>)
}

type Article = {
    id: number
    title: string
    published_at: string
    body_update_at: string
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
                    published_at: article.published_at,
                    body_update_at: article.body_updated_at,
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
                    <div className="flex flex-col items-center">
                        <a href={'https://zenn.dev/' + article.path} className="w-20 h-20 rounded-full">
                            {article.title}    
                        </a>
                        <div className="mt-1 text-sm text-gray-500">{article.published_at}</div>
                        <div className="mt-1 text-sm text-gray-500">{article.body_update_at}</div>
                        <div className="mt-1 text-sm text-gray-500">{article.liked_count}</div>
                    </div>
                </div>)
        })}
    </>)
}