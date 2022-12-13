// component to display basic user info, logout button

import {useRouter} from 'next/router';
import {useState} from 'react';
import Image from 'next/image';
import capitalize from '../lib/capitalize';

export default function UserBug (props) {

    const [showButton, setShowButton] = useState(false);

    const router = useRouter();

    function handleLogout(){
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            router.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(props.user){
        return (
            <article
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                className="UserBug"
            >
                <div className="user-avatar-wrapper">
                    <Image
                        className="user-avatar"
                        src={`https://avatars.dicebear.com/api/personas/${props.user.firstName + props.user.lastName}.svg`}
                        alt="user avatar"
                        width={70}
                        height={70}
                    />
                </div>
                <div
                    style={{
                        display: showButton ? 'flex' : 'none',
                        flexDirection: 'column',
                        alignItems: "center",
                        gap: '0.5em',
                        paddingRight: '0.5em'
                        }}
                    >
                    <span className="user-name">{capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</span>
                    <button
                        style={{

                        }}
                        className="logout-btn"
                        onClick={(e) => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            </article>
        )
    }
}