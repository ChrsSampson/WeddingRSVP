// landing page for the app

import Cookies from 'cookies';
import Navigation from '../../components/Navigation';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

export function getServerSideProps (ctx) {
    // check if user is logged in
    const cookies = new Cookies(ctx.req, ctx.res);
    const session = cookies.get('session')
    const user = cookies.get('user')

    if((session === 'false' || !session) || !user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        const parsedUser = JSON.parse(user);
        return {
            props: {
               user: parsedUser
            }
        }
    }
}


export default function App (props) {

    return (
        <div className="container">
            <Navigation user={props.user} />
            <main className="container-full App">
                {props.role === "user" ?
                    <UserDashboard user={props.user} /> :
                    <AdminDashboard user={props.user} />
                }
            </main>
        </div>
    )
}