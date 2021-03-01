export interface Post {
  id: string
  date: string
  title: string
  contentHtml: string
  category: Array<string>
  img: {
    url: string
    height: string
    width: string
  }
}

export interface Params {
  limit?: string;
  offset?: string;
  filters?: string;
}