import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Wedding | 2023</title>
        <meta name="description" content="Sampson Wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-full Home">
        <Navigation />
        <section className="Home-hero">
          <h1 className="Home-title">This is a big deal</h1>
          <sub className="Home-sub">00/00/1900</sub>
        </section>
      </main>
    </div>
  )
}
