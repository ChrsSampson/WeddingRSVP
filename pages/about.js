// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';
import {useEffect, useState} from 'react';
import {FiPlusSquare, FiMinusSquare, FiCalendar, FiFeather, FiBook, FiBriefcase} from 'react-icons/fi';


export default function About () {

    const [menu, setMenu] = useState(false);

    function checkWidth() {
       if(window.innerWidth > 900) setMenu(true);
    }

    useEffect(() => {
        checkWidth();

        window.addEventListener('resize', checkWidth);
    }, [menu]);

    

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
                <h2 style={{textAlign: 'center'}}>About</h2>
                <section className="Home-hero container About-page">
                    
                    <section className="TOC-Container">
                        <div className="TOC-header">
                            <h4>
                                Table of Contents
                            </h4>
                            <button className="TOC-button" onClick={() => setMenu(!menu)}>{menu ? <FiMinusSquare /> : <FiPlusSquare />}</button>
                        </div>

                        {
                            menu && 
                            <ul className="list-items">
                                <li>
                                    <FiCalendar />
                                    <a href="#plan">The Plan</a>
                                </li>
                                <li>
                                    <FiBriefcase />
                                    <a href="#hotel">Hotel Discounts</a>
                                </li>
                                <li>
                                    <FiBook />
                                    <a href="#Dress">Dress Code</a>
                                </li>
                                <li>
                                    <FiFeather />
                                    <a href="#registry">Registry</a>
                                </li>
                            </ul>
                        }
                    </section>

                    {/* col 2 */}
                    <section className="main-content">
                        <article id="plan" className="About-section">
                            <h2>The Plan</h2>
                            <h3>Saturday, August 19</h3>
                            <p>
                                4:00pm - Wedding Ceremony <a href="/location#park">@St. Joseph's Park</a>
                            </p>
                            <p>
                                5:00pm - Cocktail Hour <a href="/location#wilder">@The Wilder Room</a>
                            </p>
                            <p>
                                6:00pm - Reception <a href="/location#wilder">@The Wilder Room</a>
                            </p>
                            <p>
                                11:00pm - Reception Ends
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
                            <h4> Formal Garden Party</h4>
                                   <p>
                                        For a formal garden party dress code, women should opt for elegant and refined attire that
                                        complements the outdoor setting. Light, breathable fabrics such as chiffon, cotton, linen, or silk
                                        are recommended. Long flowing dresses in subtle summer colors or slightly darker hues, such
                                        as slate blue, dusty rose, plum, wisteria, steel blue, navy, burgundy, olive, forest green, or taupe
                                        are great options for a more formal event. Alternatively, jumpsuits can provide a stylish
                                        alternative to traditional dresses.
                                   </p>
                                   <p>
                                   For men, a formal garden party dress code calls for a tasteful and sophisticated outfit. This is
                                    the perfect time to bring out those lighter colored suits. Classic colors such as charcoal, light
                                    gray, navy, cobalt, tan, olive, taupe, tweed, and cream are all excellent choices that complement
                                    the season and setting but don’t be afraid to get creative and dip into pastel-colored suits and

                                    floral patterned accents. A well-fitted sport coat or sharp blazer paired with tailored trousers
                                    such as chinos or dress dress pants can be another appropriate alternative to a suit. Lightweight
                                    fabrics like linen, cotton, or a blend allow for comfort and breathability. Footwear choices should
                                    include loafers, derby shoes, or Oxford shoes in colors that harmonize with the outfit. Sneakers,
                                    flip-flops, or sandals should be avoided as they are too casual for a formal event. It is better to
                                    dress slightly more formal than underdressed to show respect for the occasion.
                                   </p>
                                   <div >
                                    <h4>Inspiration Colors</h4>
                                        <div className="color-container">
                                            <div className="color-square" style={{backgroundColor: "#8f4d51" }} />
                                            <div className="color-square" style={{backgroundColor: "#a15524" }} />
                                            <div className="color-square" style={{backgroundColor: "#d37a52" }} />
                                            <div className="color-square" style={{backgroundColor: "#6f8a69" }} />
                                            <div className="color-square" style={{backgroundColor: "#374534" }} />
                                            <div className="color-square" style={{backgroundColor: "#9cb1c2" }} />
                                            <div className="color-square" style={{backgroundColor: "#577b91" }} />
                                        </div> 
                                   </div> 
                                   <div className="column">
                                        <sub>
                                            *Note: bridesmaids will be an Azazie desert rose
                                        </sub> 
                                        <sub>
                                            **Note: The floor at the ceremony venue is stone tile, we recommend against stilettos.
                                        </sub>
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