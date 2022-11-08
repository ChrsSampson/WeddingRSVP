// form for user to fill out things such as login and signup info
import {useState} from 'react';


export default function UserForm (props) {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

}