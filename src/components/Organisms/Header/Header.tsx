import Link from 'next/link'
import headerStyles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={headerStyles.wapper}>
      <Link href="/">
        <a className={headerStyles.link}>
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