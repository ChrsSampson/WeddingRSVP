// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

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
                    <h2>Our Locations</h2>

                    <div className="Location-section">
                        <div className="dual-column content-section">
                            <article className="location-content" id="park">
                                <h2>The Ceremony</h2>
                                <div className="location-address">
                                    <h3>St. Josephs Park</h3>
                                    <p>St. Josephs Park. 118 Pleasant St,<br /> Rochester, NY 14604</p>
                                    <Link href="https://www.rochesterparks.org/rochester-city-parks/st-josephs-park/">
                                        More Infomation
                                    </Link>
                                    <p><sub>Note: Street Parking is limited, <br/> There is a parking garage across the street</sub></p>
                                </div>
                            </article>
                            <Image className="location-image"  src={'/static/park.jpg'} alt="Church" width={500} height={375} />
                        </div>
                        <iframe className="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.3844391578536!2d-77.60907892343542!3d43.15945388422428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b5aca050e689%3A0xc4a1520ebad20e54!2s118%20Pleasant%20St%2C%20Rochester%2C%20NY%2014604!5e0!3m2!1sen!2sus!4v1684246781668!5m2!1sen!2sus" width="750" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                    <div className="Location-section" id="wilder">
                        <div className="dual-column content-section content-section-reverse">
                        <Image className="location-image-reverse" src={'/static/wilder.jpg'} alt="Church" width={500} height={375} />
                            <article className="location-content">
                            <h2>The Reception</h2>
                                <div className="location-address">
                                    <h3>The Wilder Room</h3>
                                    <p>120 East Ave 2nd floor, Rochester, NY 14604<br /> Rochester, NY 14604</p>
                                    <Link href="https://www.thewilderroom.com/">
                                        More Infomation
                                    </Link>
                                    <p>
                                        <sub>
                                        Note: The East End parking Garage is located at <br />
                                                            475 East Main Street <br />
                                                            Rochester, NY 14604
                                        </sub>
                                    </p>
                                </div>
                            </article>

                        </div>
                        <iframe className="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.494706759247!2d-77.60362622338359!3d43.157138884372436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b52c7aa4f38d%3A0x947ebd7beaaa94aa!2sThe%20Wilder%20Room!5e0!3m2!1sen!2sus!4v1684273968388!5m2!1sen!2sus" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </section>
            </section>
        </div>
    )
}