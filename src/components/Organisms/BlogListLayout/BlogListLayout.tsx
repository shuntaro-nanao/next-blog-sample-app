import { useState, useCallback, useMemo } from 'react';
import { Post } from '~/types/post/post';
import { getCategories, filterPageNumberPosts, getCategoriesPosts, filterCategoriesPosts } from '~/lib/posts'
import CategoryList from '~/components/Molecules/CategoryList/CategoryList'
import BlogList from '~/components/Molecules/BlogList/BlogList'
import Pagination from '~/components/Molecules/Pagination/Pagination'
import BlogStyles from './BlogListLayout.module.scss'

interface Props {
  allPosts: Post[]
  postsCount: number
  categoriesPosts: object
};

const Blog: React.FC<Props> = ({ allPosts, postsCount, categoriesPosts }) => {

  const initialPosts = filterPageNumberPosts(allPosts, 1)
  const [currentPostsState, setCurrentPostsState] = useState<Post[]>(initialPosts)
  const [postsCountState, setPostsCountState] = useState<number>(postsCount)
  const [categoryState, setCategoryState] = useState<string>('')
  const [pageNumberState, setPageNumberState] = useState<number>(1)

  const categories = useMemo(() => {
    return getCategories(allPosts)
  }, [])

  const setCategory = useCallback(
    (event: React.MouseEvent, category: string): void => {
      event.preventDefault()
      setCurrentPostsState(filterPageNumberPosts(categoriesPosts[category], 1))
      setCategoryState(category)
      setPostsCountState(categoriesPosts[category].length)
      setPageNumberState(1)
    },[],
  )

  const clearPosts = useCallback(
    (event: React.MouseEvent): void => {
      event.preventDefault()
      setCurrentPostsState(initialPosts)
      setPostsCountState(postsCount)
      setCategoryState('')
    },[],
  )

  const setPagesPosts = useCallback(
    (event: React.MouseEvent, pageNumber: number, categoryState: string): void => {
      event.preventDefault()
      if (pageNumber === 0) return
      let currentPosts = filterPageNumberPosts(allPosts, pageNumber)
      if (categoryState !== '') {
        const categoriesPosts = getCategoriesPosts(filterCategoriesPosts(allPosts), categoryState)
        currentPosts = filterPageNumberPosts(categoriesPosts, pageNumber)
      }
      if (currentPosts.length) {
        setCurrentPostsState(currentPosts)
        setPageNumberState(pageNumber)
      }
    },[],
  )

  return (
    <>
      <div className={BlogStyles.body}>
        <div className={BlogStyles.aside}>
          <h3 className={BlogStyles.aside_title}>category</h3>
          <CategoryList
            categories={categories}
            categoryState={categoryState}
            setCategory={setCategory}
            clearPosts={clearPosts}
          />
        </div>
        <div className={BlogStyles.content} >
          <BlogList posts={currentPostsState} />
        </div>
      </div>
      <div className={BlogStyles.pagination}>
        <Pagination
          postsCount={postsCountState}
          pageNumberState={pageNumberState}
          categoryState={categoryState}
          setPagesPosts={setPagesPosts}
        />
      </div>
    </>
  )
}

export default Blog;