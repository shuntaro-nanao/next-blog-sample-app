import Link from 'next/link'
import layoutStyles from 'assets/scss/layout/layout.module.scss'
import utilityStyles from 'assets/scss/utility/utility.module.scss'

const name = '[Your Name]'

const Header: React.FC = () => {
  return (
    <header className={layoutStyles.header}>
      <Link href="/">
        <a>
          <img
            src="/images/logo.png"
            className={`${layoutStyles.headerImage} ${utilityStyles.borderCircle}`}
            alt={name}
          />
        </a>
      </Link>
      <h2 className={utilityStyles.headingLg}>
        <Link href="/">
          <a className={utilityStyles.colorInherit}>{name}</a>
        </Link>
      </h2>
    </header>
  )
}

export default Header