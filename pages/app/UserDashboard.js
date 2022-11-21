// user view for the app, list only memeber of their party and food selections

import capitalize from '../../lib/capitalize.js';
import RsvpForm from '../../components/RsvpForm.js';

import {useEffect, useState} from 'react';

export default function UserDashboard (props) {

    const [error, setError] = useState(null);
    const [message,setMessage] = useState(null);

    function renderForms () {
        return props.party.users.map((u, i) => {
            return (
                <RsvpForm
                    key={i}
                    user={u}
                    attending={u.attending}
                    allergies={u.allergies}
                    songRequest={u.songRequests}
                    foodSelection={u.foodSelection}
                    handleSubmit={handleFormSumbit}
                />
            )
        })
    }

    function handleFormSumbit (e, id, data) {
        e.preventDefault();
        fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMessage(`${data.data.firstName}'s RSVP has been updated`);
        })
        .catch(err => {
            setError(err.message);
        });
    }


    return(
        <div className="container">
            <section>
                <h1>Hello, {capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</h1>
                <h2>Party of {props.user.party.users.length}</h2>
            </section>
            {error && <h4>{error}</h4>}
            {message && <h4>{message}</h4>}
            <section className="container">
                <article className="fluid-container">
                    {/* <RsvpForm user={props.user} attending={props.user.attending} allergies={props.user.allergies} /> */}
                    {props.party.users.length > 0 ? renderForms() : <h4>Loading...</h4>}
                </article>
            </section>

        </div>
    )
}