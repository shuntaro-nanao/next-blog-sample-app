import React, { useState } from 'react';
import { perPage } from 'lib/posts'
import { Post } from '@/types/post/post';
import { getPosts } from 'lib/posts'
import paginationStyles from '@/assets/scss/object/component/Pagination.module.scss'
interface Props {
  postsCount: number
  setPostsState: React.Dispatch<React.SetStateAction<Post[]>>
};

const Pagination: React.FC<Props> = ({ postsCount, setPostsState }) => {

  const [pageNumberState, setPageNumberState] = useState<number>(1)

  const pages = Math.ceil(postsCount / perPage)
  const pageNumberHtml = [];
  for (let i = 0; i < pages; i++) {
    pageNumberHtml.push(
      <a href="#" onClick={(event) => setPosts(event, i + 1)} key={i} className={paginationStyles.c_pagination__number}>{i + 1}</a>
    )
  }

  const setPosts = async (event, pageNumber) => {
    event.preventDefault()
    if (pageNumber === pageNumberState) return 
    const pagePosts = await getPosts(pageNumber)
    setPostsState(pagePosts)
    setPageNumberState(pageNumber)
  }

  return (
    <div className={paginationStyles.c_pagination}>
      <div className={paginationStyles.c_pagination__body}>
        <nav className={paginationStyles.c_pagination__nav} aria-label="Pagination">
          <a href="#" className={paginationStyles.c_pagination__prev}>
            <svg className={paginationStyles.c_pagination__icon}>
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
            </svg>
          </a>
          {pageNumberHtml}
          <a href="#" className={paginationStyles.c_pagination__next}>
            <svg className={paginationStyles.c_pagination__icon}>
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Pagination