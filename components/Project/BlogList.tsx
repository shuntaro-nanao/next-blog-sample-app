import { Post } from '@/types/post/post';
import Link from 'next/link'
import Date from '@/components/Utility/Date'
import Pagination from '@/components/Component/Pagination'
import blogListStyles from '@/assets/scss/object/project/blogList.module.scss'

interface Props {
  posts: Post[]
  postsCount: number
  setPostsState: React.Dispatch<React.SetStateAction<Post[]>>
};

const BlogList: React.FC<Props> = ({ posts, postsCount, setPostsState }) => {
  return (
    <div className={blogListStyles.p_blog_list}>
      <ul className={blogListStyles.p_blog_list__items}>
        {posts.map(({title, date, id, category}) => (
          <li className={blogListStyles.p_blog_list__item} key={id}>
            <Link href={`/posts/${id}`}>
              <a className={blogListStyles.p_blog_list__link}>{title}</a>
            </Link>
            <div className={blogListStyles.p_blog_list__category}>
              {category.map((val, index) => {
                return <span key={index}>{val}</span>
              })}
            </div>
            <span className={blogListStyles.p_blog_list__date}>
              <Date dateString={date} />
            </span>
          </li>
        ))}
      </ul>
      <Pagination postsCount={postsCount} setPostsState={setPostsState}></Pagination>
    </div>
  )
}

export default BlogList;