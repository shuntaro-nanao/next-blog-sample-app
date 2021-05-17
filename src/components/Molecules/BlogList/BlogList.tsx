import { Post } from '~/types/post/post';
import Link from 'next/link'
import Date from '~/components/Atoms/Date/Date'
import blogListStyles from './BlogList.module.scss'

interface Props {
  posts: Post[]
};

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className={blogListStyles.wapper}>
      <ul className={blogListStyles.items}>
        {posts.map(({title, date, id, category}) => (
          <li className={blogListStyles.item} key={id}>
            <Link href={`/posts/${id}`}>
              <a className={blogListStyles.link}>{title}</a>
            </Link>
            <div className={blogListStyles.category}>
              {category.map((val, index) => {
                return <span className={blogListStyles.category__label} key={index}>{val}</span>
              })}
            </div>
            <span className={blogListStyles.date}>
              <Date dateString={date} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList;