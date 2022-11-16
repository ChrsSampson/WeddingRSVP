// a page that renders a form to create a new party

import EditPartyForm from '../../../components/EditPartyForm';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

export default function NewParty () {

    const [message, setMessage] = useState('');

    const router = useRouter();

    const submitHandler = (e, party) => {
        e.preventDefault();
        fetch('/api/party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(party)
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
            <h1>Create Party</h1>
            {message && <h5>{message}</h5>}
            <EditPartyForm create={true} message={message} backRoute="/app" party={{}} handleSubmit={submitHandler} />
        </div>
    )
}