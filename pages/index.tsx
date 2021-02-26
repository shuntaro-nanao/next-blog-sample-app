import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next'
import { getPosts , getCategories } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/Layout/Layout'
import Head from 'next/head'
import CategoryList from '@/components/Project/CategoryList'
import BlogList from '@/components/Project/BlogList'
import indexStyles from '@/assets/scss/page/index.module.scss'
interface Props {
  posts: Post[];
  categories: string[];
};

const Home: React.FC<Props> = ({ posts, categories }) => {

  const [postsState, setPostsState] = useState<Post[]>(posts)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <p>Next.jsを使用したブログテンプレートです。<br/>microCMSから記事データを取得しています。</p>
      </div>
      <div className={indexStyles.page_index}>
        <h2 className={indexStyles.page_index__title}>ブログ一覧</h2>
      </div>
      <div className={indexStyles.page_index__body}>
        <div className={indexStyles.page_index__aside}>
          <h3>カテゴリ</h3>
          <CategoryList categories={categories} setPostsState={setPostsState} />
        </div>
        <div>
          <BlogList posts={postsState} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getPosts()
    const categories = getCategories(posts)
    return {
      props: {
        posts,
        categories
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Home;