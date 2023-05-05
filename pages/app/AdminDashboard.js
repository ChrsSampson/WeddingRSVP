// Admin view for the app, lists all users and parties and allows for editing of users and parties

import UserList from '../../components/UserList';
import PartyList from '../../components/PartyList';
import SongReport from '../../components/SongReport';
import FoodReport from '../../components/FoodReport';
import {useState} from 'react';

export default function AdminDashboard (props) {

    const [tab, setTab] = useState('users');
    const [filteredUsers, setFilteredUsers] = useState(props.users);

    function handleSearch (searchTerm) {
        // reset
        searchTerm = searchTerm.toLowerCase()

        if(!searchTerm || searchTerm === '' || searchTerm === null) {
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

    function tabController () {
        // in charge of rendering the correct tab
        switch(tab) {
            case 'parties':
                return <PartyList parties={props.parties} />
            case 'songs':
                return <SongReport users={props.users} />
            case 'food':
                return <FoodReport users={props.users} />
            default:
                // default to users
                return <UserList users={props.users === filteredUsers ? props.users : filteredUsers} handleSearch={handleSearch} />
        }
            
    }

    return(
        <div className="container">
            <h1>Organizer Dashboard</h1>
            <section className="tab-container fluid-container">
                <button className="tab" onClick={() => setTab('users')}>Users</button>
                <button className="tab" onClick={() => setTab('parties')}>Parties</button>
                <button className="tab" onClick={() => setTab('songs')}>Song Requests</button>
                <button className="tab" onClick={() => setTab('food')}>Food</button>
            </section>
            <section className="container">
                { tabController() }
            </section>
        </div>
    )
}