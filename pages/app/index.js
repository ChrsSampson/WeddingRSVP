// landing page for the app

import Cookies from 'cookies';
import Navigation from '../../components/Navigation';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import connectDB from '../../database/connection';
import Head from 'next/head';

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
        try{
            // parse the current user
            const parsedUser = JSON.parse(user);

            if(!parsedUser || !parsedUser._id) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }

            if(parsedUser.role === 'admin') {
                const fetchedUsers = await (await fetch('http://localhost:3000/api/users')).json()
                users = fetchedUsers.data;
                const fetchedParties = await (await fetch('http://localhost:3000/api/party')).json()
                parties = fetchedParties.data;
            } else {
                const fetchedParty = await (await fetch(`http://localhost:3000/api/party/${parsedUser.party._id}`)).json()
                party = fetchedParty.data;
            }

            return {
                props: {
                    user: parsedUser,
                    users: users || [],
                    parties: parties || [],
                    party: party || []
                }
            }
        } catch (err) {
            return {
                notFound: true
            }
        }
    }
}

const blankUser = {
    firstName: '',
    lastName: '',
    email: '',
    party: [],
    role: 'user',
    foodSelection: '',
    allergies: '',
    songRequests: '',
    attending: false
}

export default function App ({user=blankUser, users, parties, party}) {


    return (
        <>
        <Head>
            <title>Chris&Jody 2023 | RSVP</title>
        </Head>
        <div className="container">
            <Navigation user={user} />
            <main className="container-full App">
                {user.role === "user" ?
                    <UserDashboard user={user} party={party}  /> :
                    <AdminDashboard user={user} users={users} parties={parties}  />
                }
            </main>
        </div>
        </>
    )
}