import fetch from 'node-fetch'
import { Post, Params } from 'types/post/post';

export const perPage = 6;

const getResponse = async (endPoint: string, params?) => {
  const headers = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY}
  }
  const query = (params !== undefined) ? '?' + new URLSearchParams(params) : ''
  const url = `${process.env.MICRO_CMS_API_URL}/${endPoint}${query}`
  const response = await fetch(url, headers)
  return response.json();
}

export const getPosts = async (pageId : number = 1, category?: string): Promise<Post[]> => {
  const params: Params = {}
  params.limit = perPage + ''
  params.offset = ((pageId - 1) * perPage) + ''
  if (category !== undefined) {
    params.filters = `category[contains]${category}`
  }
  const posts = await getResponse('post', params);
  return posts.contents
}

export const getAllPosts = async (): Promise<Post[]> =>{
  const posts = await getResponse('post');
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