// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';


export default function About () {
    return (
        <div>
            <Head>
                <title>About | Chris&Jody 2023</title>
                <meta name="description" content="Sampson Wedding" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            {/* col 1 */}
            <section className="container fade">
                <Navigation light />
                <h2>Your one stop shop for loads of shit</h2>
                <section className="Home-hero container About-page">
                    <section className="TOC-Container">
                        <h4>
                            Table of Contents
                        </h4>
                        <ul className="list-items">
                            <li>
                                <a href="#plan">The Plan</a>
                            </li>
                            <li>
                                <a href="#hotel">Hotel Discounts</a>
                            </li>
                            <li>
                                <a href="#Dress">Dress Code</a>
                            </li>
                            <li>
                                <a href="#registry">Registry</a>
                            </li>
                        </ul>
                    </section>

                    {/* col 2 */}
                    <section className="main-content">
                        <article id="plan" className="About-section">
                            <h2>The Plan</h2>
                                    <h3>Saturday, August 19</h3>
                                    <p>
                                        4:00pm - Wedding Ceremony @St. Joseph's Park
                                    </p>
                                    <p>
                                        5:00pm - Cocktail Hour @The Wilder Room
                                    </p>
                                    <p>
                                        6:00pm - Reception @The Wilder Room
                                    </p>
                                    <p>
                                        11:00pm - Go Home Your Drunk @Your own house (please get out)
                                    </p>
                        </article>
                        <article id="hotel" className="About-section">
                            <h2>Hotel Block (S.W.A.G) </h2>
                                    <p>
                                        Because we "care" we negotited aggressivaley with the local Marriot Hotel to get you a discount (I know we are great).
                                        <a href="https://www.marriott.com/events/start.mi?id=1621446366104&key=CORP">Have fun 😊</a>
                                    </p>
                                    <p>
                                        If you think you are better than that go ahead and book your own hotel room at this other shit hole. We don't really care.
                                                <a href="https://www.school31lofts.com/">School 31 Lofts?</a>
                                    </p>
                        </article>
                        <article id="Dress" className="About-section">
                            <h2>Dress Code</h2>
                                   <p>
                                        Jody so does delcare that "Garden Party" shall be the dress code (whatever that is, I did not get a say)
                                   </p>
                                   <h4>Behold the only accepatble colors pesants</h4>
                                   <div className="color-container">
                                        <div className="color-square" style={{backgroundColor: "red" }} />
                                        <div className="color-square" style={{backgroundColor: "blue" }} />
                                        <div className="color-square" style={{backgroundColor: "yellow" }} />
                                        <div className="color-square" style={{backgroundColor: "green" }} />
                                        <div className="color-square" style={{backgroundColor: "#657345" }} />
                                        <div className="color-square" style={{backgroundColor: "#456789" }} />
                                        <div className="color-square" style={{backgroundColor: "#9689" }} />
                                   </div>   
                        </article>
                        <article id="registry" className="About-section">
                            <h2>Registry</h2>
                            <sub>JK we don't take gifts from poors</sub>
                        </article>

                    </section>
                </section>
            </section>
        </div>
    )
}