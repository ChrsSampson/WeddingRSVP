// login page
import UserForm from '../components/userForm';
import {useState} from 'react';
import {useRouter} from 'next/router';


export default function LoginPage (props) {

    const [signup, setSignup] = useState(false);
    const [message, setMessage] = useState('');

    const sumbitHandler = (e, data) => {
        e.preventDefault();
        console.log('Form Data', data);
    }

    return (
        <section className="container-full-centered">
            <UserForm
                signup={signup}
                setSignup={setSignup}
                submitHandler={sumbitHandler}
                message={message}
            />
        </section>
    )
}