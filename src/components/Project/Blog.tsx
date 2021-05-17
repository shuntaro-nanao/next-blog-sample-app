import { useState, useCallback, useMemo } from 'react';
import { Post } from '~/types/post/post';
import { getCategories, filterPageNumberPosts, getCategoriesPosts, filterCategoriesPosts } from '~/lib/posts'
import CategoryList from '~/components/Component/CategoryList'
import BlogList from '~/components/Component/BlogList'
import Pagination from '~/components/Component/Pagination'
import BlogStyles from '~/assets/scss/object/project/Blog.module.scss'

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
      <div className={BlogStyles.p_blog__body}>
        <div className={BlogStyles.p_blog__aside}>
          <h3 className={BlogStyles.p_blog__aside_title}>category</h3>
          <CategoryList
            categories={categories}
            categoryState={categoryState}
            setCategory={setCategory}
            clearPosts={clearPosts}
          />
        </div>
        <div className={BlogStyles.p_blog__content} >
          <BlogList posts={currentPostsState} />
        </div>
      </div>
      <div className={BlogStyles.p_blog__pagination}>
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