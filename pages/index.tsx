import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import Layout, { siteTitle } from '@/components/layout/Layout'
import Date from '@/components/utility/date'
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
      <section className={utilityStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>
      <section className={`${utilityStyles.headingMd} ${utilityStyles.padding1px}`}>
        <h2 className={utilityStyles.headingLg}>Blog</h2>
        <ul className={utilityStyles.list}>
          {posts.map(({title, date, id}) => (
            <li className={utilityStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilityStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
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