// About page
import Head from  'next/head';
import Navigation from '../components/Navigation';
import {useEffect, useState} from 'react';
import {FiPlusSquare, FiMinusSquare, FiCalendar, FiFeather, FiBook, FiBriefcase} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

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
                            menu && <>
                            <div className="divider" />
                            <ul className="list-items">
                                <li>
                                    <FiCalendar />
                                    <Link href="#plan">The Plan</Link>
                                </li>
                                <li>
                                    <FiBriefcase />
                                    <Link href="#hotel">Hotel Discounts</Link>
                                </li>
                                <li>
                                    <FiBook />
                                    <Link href="#Dress">Dress Code</Link>
                                </li>
                                <li>
                                    <FiFeather />
                                    <Link href="#registry">Registry</Link>
                                </li>
                            </ul>
                            </>
                        }
                    </section>

                    {/* col 2 */}
                    <section className="main-content">
                        <article id="plan" className="About-section">
                            <h2>The Plan</h2>
                            <h3>Saturday, August 19</h3>
                            <div className='divider' />
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
                            <h2>Hotel Discount</h2>
                                <div className='column'>
                                    <p>
                                        We have a social room discounted rate at the <Link href="https://www.marriott.com/events/start.mi?id=1621446366104&key=CORP">Courtyard by Marriott</Link>. There is also a discount for AAA members. ( Those probably don't stack but you can try! )
                                    </p>
                                    <sub>
                                        <Link href="https://www.marriott.com/events/start.mi?id=1621446366104&key=CORP">Courtyard by Marriott</Link> <br />
                                        0.4 miles from the Wilder Room
                                    </sub>
                                    <iframe className="About-Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.5702282494726!2d-77.5957435825562!3d43.1555533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b525bb0ef477%3A0xecfae184905324e!2sCourtyard%20by%20Marriott%20Rochester%20Downtown!5e0!3m2!1sen!2sus!4v1684430783747!5m2!1sen!2sus" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    <sub>
                                        390 East Avenue Rochester,<br /> New York 14607
                                    </sub>
                                </div>
                                <div className="divider" />
                                <div className="column ">
                                    <p>
                                        Other Hotels in the area include:
                                    </p>
                                    <div className="hotel-list">
                                        <div className='hotel'>
                                            <Link href="https://www.school31lofts.com/">School 31 Lofts</Link>
                                            <sub>.8 miles from the Wilder Room</sub>
                                        </div>
                                        <div className='hotel'>
                                            <Link href="https://www.strathallan.com/">The Strathallan Hotel</Link>
                                            <sub>.6 miles from the Wilder Room</sub>
                                        </div>
                                        <div className='hotel'>
                                            <Link href="https://www.ihg.com/holidayinn/hotels/us/en/rochester/rocny/hoteldetail">The Holiday Inn</Link>
                                            <sub>.6 miles from the Wilder Room</sub>
                                        </div>
                                        <div className='hotel'>
                                            <Link href="https://www.hyatt.com/en-US/hotel/new-york/hyatt-regency-rochester/roche">Hyatt Regency Rochester</Link>
                                            <sub>.4 miles from the Wilder Room</sub>
                                        </div>
                                    </div>
                                    <sub>
                                        *Note: We have not reserved any rooms at these hotels
                                    </sub>
                                </div>
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
                                   <div className='divider' />
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
                            <div className='column'>
                                <p>
                                    As we start our new life together, we are excited to plan our dream honeymoon.
                                    If you would like to be a part of our journey, we have setup a honeymoon fund and are hummbly asking for contributions to help us get there.
                                </p>
                                <div className="qr-container">
                                    <div className='qr-card'>
                                        <h3><Link href="https://venmo.com/code?user_id=3341953076822016954&created=1684376724">Venmo</Link></h3>
                                        <div>
                                           <Image className='qr-code' src="/static/qrcode.png" width={1000} height={1000} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                    {/* footer for bottom spacing */}
                    <footer style={{height: '5em', width: '100%'}} > </footer>
                </section>
                
            </section>
            
        </div>
    )
}