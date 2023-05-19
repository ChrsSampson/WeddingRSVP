// form for user to fill out things such as login and signup info
import {useState} from 'react';


export default function UserForm (props) {

    const [email, setEmail] = useState('');
    const [partyCode, setPartyCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        const emailInfo = {
            email: email.toLowerCase(),
            password: password
        }

        const codeInfo = {
            firstName: firstName.toLowerCase().trim(),
            lastName: lastName.toLowerCase().trim(),
            inviteCode: partyCode
        }

        if(props.code){
            props.submitHandler(codeInfo);
        } else {
            props.submitHandler(emailInfo);
        }
    }

    function switchMode (e) {
        e.preventDefault();
        props.enableCode(!props.code);
        if(!props.code) {
            props.setMessage('Your code is displayed in your invitation');
        } else {
            props.setMessage('Event Organizer Login');
        }
    }

    // return the Login form
    return (
        <form className="UserForm" onSubmit={(e) => submitHandler(e)}>
            <h1>{props.code ? 'RSVP' : 'Login with Email'}</h1>
            {props.message ? <p>{props.message}</p> : null}
            {/* email field */}
            {!props.code && (
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            )}
            {/* first and last name field */}
            {props.code && (
                <>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </>
            )}
            {!props.code && (
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            )}
            {props.code && (
                <div className="form-group">
                    <label htmlFor="inviteCode">Invite Code</label>
                    <input
                        type="number"
                        name="inviteCode"
                        id="inviteCode"
                        value={partyCode}
                        onChange={(e) => setPartyCode(e.target.value)}
                    />
                </div>
            )}
            <div className="fluid-container">
                <input type="submit" className="btn btn-primary" value="Submit" />
                <button className="btn"
                    onClick={(e) => switchMode(e)}>
                    {props.code ? 'Login with Email' : 'Login with Code'}
                </button>
            </div>
        </form>
    )
}