import { memo } from 'react';
import { perPage, filterPageNumberPosts, filterCategoriesPosts, getCategoriesPosts } from 'lib/posts'
import { Post } from '@/types/post/post';
import paginationStyles from '@/assets/scss/object/component/Pagination.module.scss'
interface Props {
  postsCount: number
  allPosts: Post[]
  categoryState: string
  pageNumberState: number
  setCurrentPostsState: React.Dispatch<React.SetStateAction<Post[]>>
  setPageNumberState: React.Dispatch<React.SetStateAction<number>>
};

const Pagination: React.FC<Props> = memo(({
  postsCount,
  allPosts,
  categoryState,
  pageNumberState,
  setCurrentPostsState,
  setPageNumberState
}) => {

  const pages = Math.ceil(postsCount / perPage)

  const setPosts = (event, pageNumber) => {
    event.preventDefault()
    if (pageNumber === 0 || pageNumber === pageNumberState) return
    let currentPosts = filterPageNumberPosts(allPosts, pageNumber)
    if (categoryState !== '') {
      const categoriesPosts = getCategoriesPosts(filterCategoriesPosts(allPosts), categoryState)
      currentPosts = filterPageNumberPosts(categoriesPosts, pageNumber)
    }
    if (currentPosts.length) {
      setCurrentPostsState(currentPosts)
      setPageNumberState(pageNumber)
    }
  }

  return (
    <div className={paginationStyles.c_pagination}>
      <div className={paginationStyles.c_pagination__body}>
        <nav className={paginationStyles.c_pagination__nav} aria-label="Pagination">
          {(pageNumberState !== 1) ? (
            <a href="#" onClick={(event) => setPosts(event, pageNumberState - 1)} className={paginationStyles.c_pagination__prev}>
              <svg className={paginationStyles.c_pagination__icon}>
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
              </svg>
            </a>
          ) : ''}
          {(pageNumberState !== pages) ? (
            <a href="#" onClick={(event) => setPosts(event, pageNumberState + 1)} className={paginationStyles.c_pagination__next}>
              <svg className={paginationStyles.c_pagination__icon}>
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </a>
          ) : ''}
        </nav>
      </div>
    </div>
  )
})

export default Pagination