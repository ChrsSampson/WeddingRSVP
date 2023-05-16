// navigation bar component

import UserBug from './UserBug';
import Link from 'next/link';

export default function Navigation (props) {
    return (
        <nav className={props.light ? "Navigation-light" : "Navigation"}>
            <ul className="nav-list">
                <li className="nav-item">
                    <Link className="nav-link" href="/about">
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/location">
                        Location
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/app">
                        RSVP
                    </Link>
                </li>
            </ul>
            <UserBug user={props.user} />
        </nav>
    )
}

