import paginationStyles from '@/assets/scss/object/component/Pagination.module.scss'
interface Props {
  perPage?: number;
};

const Pagination: React.FC<Props> = (perPage) => {
  return (
    <div className={paginationStyles.c_pagination}>
      <div className={paginationStyles.c_pagination__body}>
        <nav className={paginationStyles.c_pagination__nav} aria-label="Pagination">
          <a href="#" className={paginationStyles.c_pagination__prev}>
            <svg className={paginationStyles.c_pagination__icon}>
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
            </svg>
          </a>
          <a href="#" className={paginationStyles.c_pagination__number}>
            1
          </a>
          <a href="#" className={paginationStyles.c_pagination__number}>
            2
          </a>
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