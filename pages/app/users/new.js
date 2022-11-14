// a page that renders a form to create a new user

import EditUserForm from '../../../components/EditUserForm';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

export default function NewUser () {

    const [message, setMessage] = useState('');

    const router = useRouter();

    const submitHandler = (e, user) => {
        e.preventDefault();
        console.log(user)
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            router.push('/app');
        })
        .catch(err => setMessage(err.message));
    }

    return (
        <div className="container">
            <EditUserForm message={message} backRoute="/app" create={true} user={{}} handleSubmit={submitHandler} />
        </div>
    )
}