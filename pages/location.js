// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';
import Image from 'next/image';

export default function About () {
    return (
        <div>
            <Head>
                <title>Location | Chris&Jody 2023</title>
                <meta name="description" content="Sampson Wedding" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="container fade">
                <Navigation light />
                <section className="Home-hero Location-page">
                    <h2>Location</h2>

                    <div className="dual-column content-section">
                        <article className="location-content">
                            <h2>The Ceremony</h2>
                            <div className="location-address">
                                <h3>St. Josephs Park</h3>
                                <p>St. Josephs Park. 118 Pleasant St,<br /> Rochester, NY 14604</p>
                                <a href="https://www.rochesterparks.org/rochester-city-parks/st-josephs-park/">
                                    More Infomation
                                </a>
                            </div>
                        </article>
                        <Image src={'/static/park.jpg'} alt="Church" width={500} height={375} />
                    </div>

                    <div className="dual-column content-section">
                        <article className="location-content-reversed">
                            <h2>The Reception</h2>
                            <Image src={'/static/wilder.jpg'} alt="Reception Room" width={500} height={375} />
                            <div className="location-address">
                                <h3>St. Josephs Park</h3>
                                <p>St. Josephs Park. 118 Pleasant St,<br /> Rochester, NY 14604</p>
                                <a href="https://www.rochesterparks.org/rochester-city-parks/st-josephs-park/">
                                    More Infomation
                                </a>
                            </div>
                        </article>
                    </div>

                    <article className="Location-Map">
                            <iframe className="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.3844391578536!2d-77.60907892343542!3d43.15945388422428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b5aca050e689%3A0xc4a1520ebad20e54!2s118%20Pleasant%20St%2C%20Rochester%2C%20NY%2014604!5e0!3m2!1sen!2sus!4v1684246781668!5m2!1sen!2sus" width="750" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </article>
                </section>
            </section>
        </div>
    )
}