import Link from 'next/link'
import headerStyles from '~/assets/scss/layout/header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={headerStyles.l_header}>
      <Link href="/">
        <a>
          <img
            src="/images/logo.png"
            alt="next-blog-sample-app"
          />
        </a>
      </Link>
    </header>
  )
}

export default Header