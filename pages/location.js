
import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'

export default function Location(){
    return(
        <div>
            <Head>
            <title>Sampson's Wedding | Location</title>
            <meta name="description" content="Sampson Wedding Location Info" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container-centered fade-in">
            <Navigation dark={true} />
            <section className="container Location">
                <article className="Location-article article dual-column">
                    <Image className="venue-img" width={1000} height={1200} src="/static/park.jpg" alt="Saint Jospeh's Park" />
                    <div>
                        <span className="content-title"> Location</span>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                            aliquam nisl nisl sit amet lorem. Sed euismod, nisl nec
                        </p>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                        </p>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                        </p>
                    </div>
                </article>
                <article className="Location-article article dual-column">
                    <div>
                        <span className="content-title">Reception</span>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                            aliquam nisl nisl sit amet lorem. Sed euismod, nisl nec
                        </p>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                        </p>
                        <p className="content">
                            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed euismod, nisl nec aliquam tincidunt, nunc nisl aliquam
                            ipsum, nec aliquam nisl nisl sit amet lorem. Sed euismod,
                            nisl nec aliquam tincidunt, nunc nisl aliquam ipsum, nec
                        </p>
                    </div>
                    <Image className="venue-img" width={1000} height={1200} src="/static/wilder.jpeg" alt="Saint Jospeh's Park" />
                </article>
            </section>
        </main>
        </div>
    )
}