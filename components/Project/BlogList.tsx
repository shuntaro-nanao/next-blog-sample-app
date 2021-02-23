import { Post } from '@/types/post/post';
import Link from 'next/link'
import Date from '@/components/Utility/Date'
import blogListStyles from '@/assets/scss/object/project/blogList.module.scss'

type Props = {
  posts: Post[];
};

console.log(blogListStyles);

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className={blogListStyles.p_blog_list}>
      <ul className={blogListStyles.p_blog_list__items}>
        {posts.map(({title, date, id}) => (
          <li className={blogListStyles.p_blog_list__item} key={id}>
            <Link href={`/posts/${id}`}>
              <a className={blogListStyles.p_blog_list__link}>{title}</a>
            </Link>
            <span className={blogListStyles.p_blog_list__date}>
              <Date dateString={date} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList;