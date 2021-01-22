import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { getPostIds, getPost } from 'lib/posts'
import { Post } from 'types/post/post';
import Layout from 'components/layout'
import Date from 'components/date'
import utilStyles from 'styles/utils.module.scss'

type Props = {
  post: Post;
};

const PostId: React.FC<Props> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id as string)
  return {
    props: {
      post
    }
  }
}

export default PostId