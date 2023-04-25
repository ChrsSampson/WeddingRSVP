// Admin view for the app, lists all users and parties and allows for editing of users and parties

import UserList from '../../components/UserList';
import PartyList from '../../components/PartyList';
import {useState} from 'react';

export default function AdminDashboard (props) {

    const [tab, setTab] = useState('users');
    const [filteredUsers, setFilteredUsers] = useState(props.users);

    function handleSearch (searchTerm) {
        // reset
        searchTerm = searchTerm.toLowerCase()

        if(searchTerm === '' || searchTerm === null) {
            setFilteredUsers(props.users)
        }

        const newResult = filteredUsers.filter(user => {
            if( user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ) {
                    return true
            }
        })

        setFilteredUsers(newResult)
    }

    return(
        <div className="container">
            <h1>Organizer Dashboard</h1>
            <section className="tab-container fluid-container">
                <button className="tab" onClick={() => setTab('users')}>Users</button>
                <button className="tab" onClick={() => setTab('parties')}>Parties</button>
            </section>
            <section className="dual-column">
                {tab === "users" ? 
                    <UserList users={props.users === filteredUsers ? props.users : filteredUsers} handleSearch={handleSearch} />
                :
                    <PartyList parties={props.parties} />
                }
            </section>
        </div>
    )
}