// user view for the app, list only memeber of their party and food selections

import capitalize from '../../lib/capitalize.js';
import RsvpForm from '../../components/RsvpForm.js';

import {useEffect, useState} from 'react';

export default function UserDashboard (props) {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        if(props.user.party.users && props.user.party.users.length > 0){
            const m = [];
            for(let u of props.user.party.users){
                fetch(`/api/users/${u}`, {
                    method: 'GET'                    
                })
                .then(res => res.json())
                .then(data => {
                    m.push(data.data)
                    setMembers(m);
                })
            }
            setMembers([...m]);
        }

    }, []);

    return(
        <div className="container">
            <section>
                <h1>Hello, {capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</h1>
                <h2>Party of {props.user.party.users.length}</h2>
            </section>
            <section className="container">
                <article className="fluid-container">
                    {/* <RsvpForm user={props.user} attending={props.user.attending} allergies={props.user.allergies} /> */}
                    {members.length && members.map((u, i) => {
                        return <RsvpForm key={i} user={u} attending={u.attending} allergies={u.allergies} songRequest={u.songRequests} />
                    })
                    }
                </article>
            </section>

        </div>
    )
}