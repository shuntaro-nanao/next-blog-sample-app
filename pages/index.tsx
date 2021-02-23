import { GetStaticProps } from 'next'
import { getPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/Layout/Layout'
import Head from 'next/head'
import BlogList from '@/components/Project/BlogList'

import utilityStyles from '@/assets/scss/utility/utility.module.scss'

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilityStyles.headingMd}>
        <p>Next.jsを使用したブログテンプレートです。<br/>microCMSから記事データを取得しています。</p>
      </div>
      <h2 className={utilityStyles.headingLg}>ブログ一覧</h2>
      <BlogList posts={posts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getPosts();
    return {
      props: {
        posts
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Home;