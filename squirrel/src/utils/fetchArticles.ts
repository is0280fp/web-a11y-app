import {object, optional, nullable, array, number, string, boolean, safeParse} from 'valibot'

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
        source_repo_updated_at: nullable(string()),
        pinned: boolean(),
        path: string(),
        user: object({
            id: number(),
            username: string(),
            name: string(),
            avarar_small_url: optional(string())
        }),
        publication: nullable(object({
            id: number(),
            avatar_registered: boolean(),
            avatar_small_url: string(),
            display_name: string(),
            name: string(),
            pro: boolean()
        })),
    })),
    next_page: nullable(string()),
})

// エラーハンドリングをする
// valibotで型をつける
export const fetchZennArticles = async (authorId: string) => {
    try {
        const res = await fetch(`/api/articles?username=${authorId}&order=latest`)
        const json = await res.json()
        const result = safeParse(AritcleSchema, json)
        if (result.success) {
            return result.output
          } else {
            console.log(result.issues)
          }
    } catch (err) {
        console.error(err)
    }
}