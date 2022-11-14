// user view for the app, list only memeber of their party and food selections

import capitalize from '../../lib/capitalize.js';

export default function UserDashboard (props) {


    return(
        <div className="container">
            <h1>Hello, {capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</h1>
            <h2>{capitalize(props.user.lastName)} Party of {props.user.party.users.length}</h2>

        </div>
    )
}