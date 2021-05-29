import { GetStaticProps } from 'next'
import { getAllPosts, filterCategoriesPosts } from '~/lib/posts'
import { Post } from '~/types/post/post';
import Layout, { siteTitle } from '~/components/Organisms/Layout/Layout'
import Head from 'next/head'
import Blog from '~/components/Organisms/BlogListLayout/BlogListLayout';

type Props = {
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
      <Blog
        allPosts={allPosts}
        postsCount={postsCount}
        categoriesPosts={categoriesPosts}
      />
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