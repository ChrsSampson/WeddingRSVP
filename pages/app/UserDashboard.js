// user view for the app, list only memeber of their party and food selections
import capitalize from '../../lib/capitalize.js';
import RsvpForm from '../../components/RsvpForm.js';
import {useEffect, useState} from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function UserDashboard (props) {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        lookupPartyMembers();
    }, []);

    function lookupPartyMembers () {
        if(props.user.party.users && props.user.party.users.length > 0){
            const m = [];
            for(let u of props.user.party.users){
                fetch(`/api/users/${u}`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(data => {
                    m.push(data.data)
                    setMembers([...m]);
                })
            }
        }
    }



    if(props.user){
        return(
            <div className="container">
                <section>
                    <h1>Hello, {capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</h1>
                    <h2>Party of {props.user.party.users.length}</h2>
                    <h6><Link href="/about#Food">View Entrees</Link></h6>
                </section>
                <section className="container">
                    <article className="fluid-container RSVP-holder">
                        {members.length && members.map((u, i) => {
                            return <RsvpForm key={i} user={u} foodSelection={u.foodSelection} attending={u.attending} allergies={u.allergies} songRequest={u.songRequests} />
                        })
                        }
                    </article>
                </section>
                <footer className="column">
                    <sub>
                        *Something not look right? <Link className="Link" href="mailto:csamposn@gmail.com">Please contact the bride or groom to update your party.</Link>
                    </sub>
                    <sub>
                        **Avatars are randomly generated and do not represent the actual person (I just think they are neet)
                    </sub>
                </footer>
            </div>
        )
    }
}