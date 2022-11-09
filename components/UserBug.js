// component to display basic user info, logout button

import {useRouter} from 'next/router';
import {useState} from 'react';

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
                style={{
                    borderColor: props.user.color
                }}
            >
                <div
                    className="user-info"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span className="user-avatar"
                        style={{backgroundColor: props.user.color}}
                    >
                        <div>{String(props.user.firstName[0]).toUpperCase()} {String(props.user.lastName[0]).toUpperCase()}</div>
                    </span>
                    <span
                        class="user-name"
                        style={{
                            maxWidth: `${showButton ? '100%' : '0'}`,
                        }}
                    >
                        {props.user.firstName} {props.user.lastName}
                    </span>
                </div>
                    <button
                        style={{

                        }}
                        className="logout-btn"
                        onClick={(e) => handleLogout()}
                    >
                        Logout
                    </button>
            </article>
        )
    }
}