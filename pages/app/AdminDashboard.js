// Admin view for the app, lists all users and parties and allows for editing of users and parties

import UserList from '../../components/UserList';
import PartyList from '../../components/PartyList';

export default function AdminDashboard (props) {


    return(
        <div className="container">
            <h1>Organizer Dashboard</h1>
            <section className="dual-column">
                <UserList users={props.users} />
                <PartyList parties={props.parties} />
            </section>
        </div>
    )
}