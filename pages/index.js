import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'

export default function Home() {


  return (
    <div className="">
      <Head>
        <title>Chris&Jody 2023 | Welcome</title>
        <meta name="description" content="Sampson Wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-full Home fade-in">
        <Navigation />
        <section className="Home-hero">
          <h1 className="Home-title">This is a big deal</h1>
          <sub className="Home-sub">08/19/2023</sub>
        </section>
      </main>
    </div>
  )
}
