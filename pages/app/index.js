// landing page for the app

import Cookies from 'cookies';

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
        <div>
            <h1>If you see this you are in</h1>
            <span>{props.user.firstName} {props.user.lastName}</span>
        </div>
    )
}