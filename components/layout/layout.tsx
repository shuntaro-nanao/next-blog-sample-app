import Head from 'next/head'
import Link from 'next/link'
import layoutStyles from 'assets/scss/layout/layout.module.scss'
import utilityStyles from 'assets/scss/utility/utility.module.scss'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

type Props = {
  children: React.ReactNode
  home?: boolean
};

const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <div className={layoutStyles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={layoutStyles.header}>
        {home ? (
          <>
            <img
              src="/images/logo.png"
              className={`${layoutStyles.headerHomeImage} ${utilityStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilityStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
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
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={layoutStyles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout;