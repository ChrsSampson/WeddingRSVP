// form for user to fill out things such as login and signup info
import {useState} from 'react';


export default function UserForm (props) {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        props.submitHandler(e, {
            email,
            password
        })
    }

    function handleSignup (){
        console.log('This is not allowed');
    }

    return (
        <form className="UserForm" onSubmit={submitHandler}>
            <h1>{props.signup ? 'Sign Up' : 'Login'}</h1>
            {props.message ? <p>{props.message}</p> : null}
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
            {props.signup && (
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
            {props.signup && (
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            )}
            <div className="fluid-container">
                <button type="submit" className="btn btn-primary">
                    {props.signup ? 'Sign Up' : 'Login'}
                </button>
            </div>
        </form>
    )
}