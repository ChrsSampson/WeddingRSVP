// landing page for the app

import Cookies from 'cookies';
import Navigation from '../../components/Navigation';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import connectDB from '../../database/connection';

export async function getServerSideProps (ctx) {
    // connect to database
    await connectDB()

    // check if user is logged in
    const cookies = new Cookies(ctx.req, ctx.res);
    const session = cookies.get('session')
    const user = cookies.get('user')

    // data to be sent to the client
    let users, parties, party = '';

    if((session === 'false' || !session) || !user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        // parse the current user
        const parsedUser = JSON.parse(user);

        if(parsedUser.role === 'admin') {
            const fetchedUsers = await (await fetch('http://localhost:3000/api/users')).json()
            users = fetchedUsers.data;
            const fetchedParties = await (await fetch('http://localhost:3000/api/party')).json()
            parties = fetchedParties.data;
        } else {
            const fetchedParty = await (await fetch(`http://localhost:3000/api/party/${parsedUser.party._id}`)).json()
            console.log(fetchedParty);
            party = fetchedParty.data;
        }


        return {
            props: {
                user: parsedUser,
                users: users || [],
                parties: parties || [],
                party: party || null
            }
        }
    }
}

export default function App (props) {

    return (
        <div className="container">
            <Navigation user={props.user} dark={true} />
            <main className="container-full-centered App">
                {props.user.role === "user" ?
                    <UserDashboard user={props.user} party={props.party}  /> :
                    <AdminDashboard user={props.user} users={props.users} parties={props.parties}  />
                }
            </main>
        </div>
    )
}