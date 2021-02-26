import fetch from 'node-fetch'
import { Post } from 'types/post/post';

const getResponse = async (endPoint: string) => {
  const apiKey = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY}
  }
  const url = `${process.env.MICRO_CMS_API_URL}/${endPoint}`
  const response = await fetch(url, apiKey)
  return await response.json();
}

export const getPosts = async (): Promise<Post[]> => {
  const posts = await getResponse('post');
  return posts.contents
}

export const getPost = async (id: string): Promise<Post> => {
  const post = await getResponse(`post/${id}`);
  return post
}

export const getCategoryPosts = async (category: string): Promise<Post[]> => {
  const posts = await getResponse(`post?filters=category[contains]${category}`);
  return posts.contents
}

export const getPostIds = async () => {
  const posts = await getPosts();
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