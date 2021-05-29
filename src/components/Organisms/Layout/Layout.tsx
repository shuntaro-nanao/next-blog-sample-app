import Head from 'next/head'
import Header from '../Header/Header'
import styles from './Layout.module.scss'

export const siteTitle = 'Next.js Sample Website'

type Props = {
  children: React.ReactNode
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Next.jsを使用したブログテンプレートです"/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="" />
      </Head>
      <Header/>
      <div className={styles.container}>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </>
  )
}

export default Layout;