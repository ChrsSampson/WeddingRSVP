// a form to edit users

import Image from 'next/image';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function EditUserForm ({user, backRoute = '/app', handleSubmit, handleDelete}) {

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [role, setRole] = useState(user.role || 'attendee');
    const [party, setParty] = useState(user.party || null);
    const [parties, setParties] = useState([]);

    const router = useRouter();

    useEffect(() => {
        // get all parties from the database
        const getParties = async () => {
            const res = await fetch('/api/parties');
            const data = await res.json();
            setParties([...data]);
        }

        getParties();
    }, [])


    const data = {
        firstName,
        lastName,
        email,
        role
    }

    return (
        <div className="container-full-centered">
            <div className="fluid-container">
                <h1>Edit User</h1>
                <Image
                    className="user-avatar"
                    src={`https://avatars.dicebear.com/api/personas/${user.firstName + user.lastName}.svg`}
                    alt="user avatar"
                    width={50}
                    height={50}
                />
            </div>
            <form onSubmit={(e) => handleSubmit(e, data)} className="UserForm">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='party'>
                        Party
                    </label>
                    <select
                        name='party'
                        id='party'
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                    >
                        <option value=''>-- Please Select a Party --</option>
                        {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                                {party.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        name="role"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Organizer</option>
                        <option value="user">Attendee</option>
                    </select>
                </div>
                <div className="fluid-container">
                    <button type="submit">Submit</button>
                    <button className="logout-btn" onClick={() => router.push(backRoute)}>
                        Back
                    </button>
                    <button className="danger-btn" onClick={() => handleDelete()}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )

}