import {type Output, object, array, number, string, boolean} from 'valibot'

const AritcleSchema = object({
    articles: array(object({
        id: number(),
        post_type: string(),
        title: string(),
        slug: string(),
        comments_count: number(),
        liked_count: number(),
        body_letters_count: number(),
        article_type: string(),
        emoji: string(),
        is_suspending_private: boolean(),
        published_at: string(),
        body_updated_at: string(),
        source_repo_updated_at: string(),
        piined: boolean(),
        user: object({
            id: number(),
            username: string(),
            name: string(),
            avarar_small_url: string()
        }),
        publication: string()
    })),
    next_page: string()
})

// エラーハンドリングをする
// valibotで型をつける
export const fetchZennArticles = async (authorId: string) => {
  const res = await fetch(`https://zenn.dev/api/articles?username=${authorId}&order=latest`)
  const data = await res.json()
  return data
}