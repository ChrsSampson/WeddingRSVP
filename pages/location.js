// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';


export default function About () {
    return (
        <div>
            <Head>
                <title>Location | C&J 2023</title>
                <meta name="description" content="Sampson Wedding" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="container-full fade">
                <Navigation />
                <section className="Home-hero">
                    <h1>Location</h1>
                    <i>Coming soon</i>
                </section>
            </section>
        </div>
    )
}