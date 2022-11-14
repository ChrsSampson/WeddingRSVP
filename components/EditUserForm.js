// a form to edit users

import Image from 'next/image';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function EditUserForm ({user, backRoute, handleSubmit, handleDelete, create=false, message}) {

    // let initparty = user.party._id || null

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [role, setRole] = useState(user.role || 'attendee');
    const [party, setParty] = useState(null);
    const [parties, setParties] = useState([]);

    const router = useRouter();

    useEffect(() => {
        // get all parties from the database
        const getParties = async () => {
            const res = await fetch('/api/party');
            const data = await res.json();
            console.log(data);
            setParties([...data.data]);
        }

        getParties();
    }, [])


    const data = {
        firstName,
        lastName,
        email,
        role,
        party
    }

    return (
        <div className="container-full-centered">
            <div className="fluid-container">
                {create? <h1>Create User</h1> : <h1>Edit User</h1>}
                <Image
                    className="user-avatar"
                    src={`https://avatars.dicebear.com/api/personas/${create ? firstName + lastName : user.firstName + user.lastName}.svg`}
                    alt="user avatar"
                    width={50}
                    height={50}
                />
            </div>
            {message && <span>{message}</span>}
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
                        <option value="">None</option>
                        {parties.map((party) => (
                            <option key={party._id} value={party._id}>
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
                        <option value="user">Attendee</option>
                        <option value="admin">Organizer</option>
                    </select>
                </div>
                <div className="fluid-container">
                    <button type="submit">Submit</button>
                    <button className="logout-btn" onClick={() => router.push(backRoute)}>
                        Back
                    </button>
                    {create? null : <button className="logout-btn" onClick={(e) => handleDelete(e, user.id)}>Delete</button>}
                </div>
            </form>
        </div>
    )

}