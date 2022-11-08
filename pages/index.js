import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>RSVP | 2023</title>
        <meta name="description" content="Wedding RSVP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <nav>
          <a href="/app">RSVP</a>
        </nav>
        <h2>This Shall be the pretty public page</h2>
      </main>

      <footer>

      </footer>
    </div>
  )
}
