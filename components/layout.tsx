import Navbar from './navbar'
import Footer from './footer'
import Head from "next/head";

// @ts-ignore
export default function Layout({children}) {
  return (
      <>
        <div className="md:container mx-2 md:mx-auto">
          <Head>
            <title>Movie App</title>
            <meta name="description" content="This is a movie app made with nextjs"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </div>
      </>
  )
}