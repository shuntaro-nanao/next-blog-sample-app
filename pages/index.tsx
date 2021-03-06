import React, { useState } from 'react';
import { GetStaticProps } from 'next'
import { getAllPosts, getCategories, filterCategoriesPosts, filterPageNumberPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/Layout/Layout'
import Head from 'next/head'
import CategoryList from '@/components/Project/CategoryList'
import BlogList from '@/components/Project/BlogList'
import Pagination from '@/components/Component/Pagination'
import indexStyles from '@/assets/scss/page/index.module.scss'
interface Props {
  allPosts: Post[]
  postsCount: number
  categoriesPosts: object
};

const Home: React.FC<Props> = ({ allPosts, postsCount, categoriesPosts }) => {

  const initialPosts = filterPageNumberPosts(allPosts, 1)
  const [currentPostsState, setCurrentPostsState] = useState<Post[]>(initialPosts)
  const [postsCountState, setPostsCountState] = useState<number>(postsCount)
  const [categoryState, setCategoryState] = useState<string>('')
  const [pageNumberState, setPageNumberState] = useState<number>(1)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={indexStyles.page_index}>
        <h2 className={indexStyles.page_index__title}>ブログ一覧</h2>
      </div>
      <div className={indexStyles.page_index__body}>
        <div className={indexStyles.page_index__aside}>
          <h3 className={indexStyles.page_index__aside_title}>category</h3>
          <CategoryList
            categories={getCategories(allPosts)}
            categoriesPosts={categoriesPosts}
            initialPosts={initialPosts}
            categoryState={categoryState}
            initialpPostsCount={postsCount}
            setCurrentPostsState={setCurrentPostsState}
            setPostsCountState={setPostsCountState}
            setCategoryState={setCategoryState}
            setPageNumberState={setPageNumberState}
          />
        </div>
        <div className={indexStyles.page_index__content} >
          <BlogList posts={currentPostsState} />
        </div>
      </div>
      <div className={indexStyles.page_index__pagination}>
        <Pagination
          postsCount={postsCountState}
          allPosts={allPosts}
          categoryState={categoryState}
          pageNumberState={pageNumberState}
          setCurrentPostsState={setCurrentPostsState}
          setPageNumberState={setPageNumberState}
        />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allPosts = await getAllPosts()
    const categoriesPosts = filterCategoriesPosts(allPosts)
    const postsCount = allPosts.length
    return {
      props: {
        allPosts,
        postsCount,
        categoriesPosts,
      },
    };
  } catch (error) {
    console.error(error)
  }
}

export default Home;