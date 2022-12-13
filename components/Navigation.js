// navigation bar component

import UserBug from './UserBug';
import Link from 'next/link';

export default function Navigation (props) {
    const theme = props.dark ? 'dark' : 'light';

    return (
        <nav className={`Navigation nav-${theme}-mode`}>
            <ul className="nav-list">
                <li className="nav-item">
                    <a className="nav-link" href="/about">
                        About
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/location">
                        Location
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/app">
                        RSVP
                    </a>
                </li>
            </ul>
            <UserBug user={props.user} />
        </nav>
    )
}

