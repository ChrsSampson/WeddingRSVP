import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function About(){
 return(
    <div>
        <Head>
            <title>Sampson's Wedding | About</title>
            <meta name="description" content="Sampson Wedding" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container-full About">
            <Navigation dark={true} />
            <section className="container-centered">
                <article className='article About-article'>
                    <span className="content-title">About</span>
                    <p className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                        tincidunt nisl, eget aliquam nisl nisl sit amet lorem.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                        tincidunt nisl, eget aliquam nisl nisl sit amet lorem.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                        tincidunt nisl, eget aliquam nisl nisl sit amet lorem.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                    </p>
                    <ul className="content-list">
                        <li>
                            <span className="content-title">Lorem</span>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Nullam auctor, nisl eget aliquam ultricies,
                            </p>
                        </li>
                        <li>
                            <span className="content-title">Ipsum</span>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Nullam auctor, nisl eget aliquam ultricies,
                            </p>
                        </li>
                    </ul>
                    <p className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                        tincidunt nisl, eget aliquam nisl nisl sit amet lorem.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                        tincidunt nisl, eget aliquam nisl nisl sit amet lorem.
                        Nullam auctor, nisl eget aliquam ultricies, nunc nisl
                    </p>
                </article>
            </section>
        </main>
    </div>
 )   
}