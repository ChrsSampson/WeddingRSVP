// landing page for the app

import Cookies from 'cookies';
import Navigation from '../../components/Navigation';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import connectDB from '../../database/connection';
import Head from 'next/head';
import User from '../../database/userModel';
import Party from '../../database/partyModel';

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
            const parsedUser = JSON.parse (user );

            // if(!parsedUser || !parsedUser._id) {
            //     return {
            //         redirect: {
            //             destination: '/login',
            //             permanent: false
            //         }
            //     }
            // }

            if(parsedUser.role === 'admin') {
                users = await (await User.find({}).populate('party'));

                parties = await (await Party.find({}).populate('users'));

            } else {
                party = await (await Party.findById(parsedUser.party._id).populate('users'));
            }


            return {
                props: {
                    "user":  parsedUser,
                    "users":  JSON.stringify( users) || [],
                    "parties":  JSON.stringify (parties) || [],
                    "party": JSON.stringify( party) || []
                }
            }
        } catch (err) {
            console.log(err)
            // return {
            //     notFound: true
            // }
        }
    }
}

// const blankUser = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     party: [],
//     role: 'user',
//     foodSelection: '',
//     allergies: '',
//     songRequests: '',
//     attending: false
// }

export default function App ({user, users, parties, party}) {

    return (
        <>
        <Head>
            <title>Chris&Jody 2023 | RSVP</title>
        </Head>
        <div className="container">
            <Navigation user={ user} light />
            <main className="container App">
                {user.role === "user" ?
                    <UserDashboard user={user} party={JSON.parse( party )}  /> :
                    <AdminDashboard user={user} users={JSON.parse( users) } parties={JSON.parse( parties) }  />
                }
            </main>
        </div>
        </>
    )
}