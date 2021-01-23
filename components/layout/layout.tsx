import Head from 'next/head'
import Header from './Header'
import layoutStyles from 'assets/scss/layout/layout.module.scss'

export const siteTitle = 'Next.js Sample Website'

type Props = {
  children: React.ReactNode
};

const Layout: React.FC<Props> = ({ children }) => {
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
      <Header/>
      <main>{children}</main>
    </div>
  )
}

export default Layout;