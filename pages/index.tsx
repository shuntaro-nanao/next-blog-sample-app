import { GetStaticProps } from 'next'
import { getAllPosts, filterCategoriesPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/Layout/Layout'
import Head from 'next/head'
import indexStyles from '@/assets/scss/page/index.module.scss'
import Blog from '@/components/Project/Blog';
interface Props {
  allPosts: Post[]
  postsCount: number
  categoriesPosts: object
};

const Home: React.FC<Props> = ({ allPosts, postsCount, categoriesPosts }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={indexStyles.page_index}>
        <h2 className={indexStyles.page_index__title}>ブログ一覧</h2>
      </div>
      <Blog allPosts={allPosts} postsCount={postsCount} categoriesPosts={categoriesPosts} />
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