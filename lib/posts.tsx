import fetch from 'node-fetch'
import { Post, Params } from 'types/post/post';

export const perPage = 3;

const getResponse = async (endPoint: string, params?) => {
  const headers = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY}
  }
  const query = (params !== undefined) ? '?' + new URLSearchParams(params) : ''
  const url = `${process.env.MICRO_CMS_API_URL}/${endPoint}${query}`
  console.log(url)
  const response = await fetch(url, headers)
  return response.json();
}

export const getAllPosts = async (): Promise<Post[]> =>{
  const params: Params = {}
  params.limit = 999 + ''
  const posts = await getResponse('post', params);
  return posts.contents
}

export const getPost = async (id: string): Promise<Post> => {
  const post = await getResponse(`post/${id}`);
  return post
}

export const getPostIds = async () => {
  const posts = await getAllPosts();
  const postIds = posts.map(posts => posts.id)
  return postIds.map(postId => {
    return {
      params: {
        id: postId
      }
    }
  })
}

export const getCategories = (posts): string[] => {
  let categories = []
  posts.filter((val) => {
    categories.push(...val.category)
  })
  return Array.from(new Set(categories).values())
}

export const filterCategoriesPosts = (posts: Post[]): {[s: string]: string} => {
  const categoriesPosts = {}
  const categories = getCategories(posts)
  categories.map((category) => {
    categoriesPosts[category] = []
    posts.filter((post) =>{
      if (post.category.indexOf(category) !== -1) {
        categoriesPosts[category].push(post)
      }
    })
  })
  return categoriesPosts
}

export const getCategoriesPosts = (categoriesPosts: object, caterory: string): Post[] => {
  return categoriesPosts[caterory]
}

export const filterPageNumberPosts = (posts: Post[], pageNumber: number): Post[] => {
  return posts.slice((pageNumber - 1) * perPage, perPage * pageNumber)
}