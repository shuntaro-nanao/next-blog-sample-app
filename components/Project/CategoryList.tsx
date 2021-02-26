import { Post } from '@/types/post/post';
import { getCategoryPosts } from '@/lib/posts'

interface Props {
  setPostsState: React.Dispatch<React.SetStateAction<Post[]>>
  categories: string[]
};

const setCategory = async(event, setPostsState, category) => {
  event.preventDefault()
  const categoryPosts = await getCategoryPosts(category)
  setPostsState(categoryPosts)
}

const CategoryList: React.FC<Props> = ({categories, setPostsState}) => {
  return (
    <div>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" onClick={(event) => setCategory(event, setPostsState, category)}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList;