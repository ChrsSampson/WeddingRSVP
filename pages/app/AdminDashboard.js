// Admin view for the app, lists all users and parties and allows for editing of users and parties

import UserList from '../../components/UserList';
import PartyList from '../../components/PartyList';
import {useState} from 'react';

export default function AdminDashboard (props) {

    const [tab, setTab] = useState('users');

    return(
        <div className="container">
            <h1>Organizer Dashboard</h1>
            <section className="tab-container fluid-container">
                <button className="tab" onClick={() => setTab('users')}>Users</button>
                <button className="tab" onClick={() => setTab('parties')}>Parties</button>
            </section>
            <section className="container">
                {tab === "users" ? 
                    <UserList users={props.users} />
                :
                    <PartyList parties={props.parties} />
                }
            </section>
        </div>
    )
}