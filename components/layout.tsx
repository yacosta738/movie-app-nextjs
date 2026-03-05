import Navbar from './navbar'
import Footer from './footer'
import Head from "next/head";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
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
