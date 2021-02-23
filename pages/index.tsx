import { GetStaticProps } from 'next'
import { getPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/Layout/Layout'
import Head from 'next/head'
import BlogList from '@/components/Project/BlogList'
import indexStyles from '@/assets/scss/page/index.module.scss'

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }) => {
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