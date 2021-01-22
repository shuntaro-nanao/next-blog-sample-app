import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPosts } from 'lib/posts'
import { Post } from 'types/post/post';
import Layout, { siteTitle } from 'components/layout'
import Date from 'components/date'
import utilStyles from 'styles/utils.module.scss'

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({title, date, id}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
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