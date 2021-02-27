import React, { useState, useEffect } from 'react';
import { Post } from '@/types/post/post';
import { getCategoryPosts, getPosts } from '@/lib/posts'
import categoryListStyles from '@/assets/scss/object/project/CategoryList.module.scss'

interface Props {
  setPostsState: React.Dispatch<React.SetStateAction<Post[]>>
  categories: string[]
};

const setCategory = async(event, setPostsState, setCategoryState, category) => {
  event.preventDefault()
  const categoryPosts = await getCategoryPosts(category)
  setPostsState(categoryPosts)
  setCategoryState(category)
}

const clearPosts = async(setPostsState, setCategoryState) => {
  const posts = await getPosts()
  setPostsState(posts)
  setCategoryState('')
}

const CategoryList: React.FC<Props> = ({categories, setPostsState}) => {

  const [categoryState, setCategoryState] = useState<string>('')

  return (
    <div>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className={categoryListStyles.p_category_list__list}>
            <a
              href="#"
              className={(category === categoryState) ? 'is-active' : ''}
              onClick={(event) => setCategory(event, setPostsState, setCategoryState, category)}
            >
              {category}
              {(category === categoryState) ? (
                <svg onClick={() => clearPosts(setPostsState, setCategoryState)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clipRule="evenodd" />
                </svg>
              ) : ''}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList;