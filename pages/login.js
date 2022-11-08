// login page
import UserForm from '../components/UserForm';
import {useState} from 'react';
import {useRouter} from 'next/router';


export default function LoginPage (props) {

    const [signup, setSignup] = useState(false);
    const [message, setMessage] = useState('You must login to continue');
    const router = useRouter();

    const sumbitHandler = (e, data) => {
        e.preventDefault();
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status !== 200){
                setMessage(data.error || data.message);
            } else {
                router.push('/app')
            }
        })
        .catch(err => {
            console.error(err)
            setMessage(err);
        })
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