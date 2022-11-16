// party edit page

import Party from '../../../database/partyModel'
import EditPartyForm from '../../../components/EditPartyForm';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

export async function getStaticProps (ctx) {
    const id = ctx.params.id;

    // data to be sent to the client
    const party = JSON.stringify ( await Party.findById(id).populate('users') );

    return {
        props: {
            id: id,
            party: JSON.parse(party)
        }
    }
}

export function getStaticPaths (ctx) {

    return {
        paths: [
            { params: { id: '1' } },
        ],
        fallback: true
    }
}

export default function PartyEditPage (props) {
    const router = useRouter();

    const [message, setMessage] = useState('');

    function submitHandler (e, data) {
        e.preventDefault();
        fetch(`/api/party/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                router.push('/app');
            } else {
                const error = new Error(data.message)
                throw error;
            }
        })
        .catch(err => setMessage(err.message));
    }

    function handleDelete (e, id) {
        e.preventDefault();
        fetch(`/api/party/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                router.push('/app');
            } else {
                const error = new Error(data.message)
                throw error;
            }
        })
        .catch(err => setMessage(err.message));
    }

    return (
        <div className="container-full-centered">
            <h1>Edit Party</h1>
            {message && <h5>{message}</h5>}
            <EditPartyForm create={false} message={message} backRoute="/app" party={props.party} handleDelete={handleDelete} handleSubmit={submitHandler} />
        </div>
    )
}