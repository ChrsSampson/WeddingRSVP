// component to display basic user info, logout button

import {useRouter} from 'next/router';

export default function UserBug (props) {

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
            <article className="UserBug">
                <div className="user-info">
                    <span>{props.user.firstName} {props.user.lastName}</span>
                </div>
                <button onClick={(e) => handleLogout()}>
                    Logout
                </button>
            </article>
        )
    }
}