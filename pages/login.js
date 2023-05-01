// login page
import UserForm from '../components/UserForm';
import {useState} from 'react';
import {useRouter} from 'next/router';


export default function LoginPage (props) {

    const [code, enableCode] = useState(true);
    const [message, setMessage] = useState('Your code is displayed in your invitation');
    const router = useRouter();

    const sumbitHandler = (data) => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
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
                code={code}
                enableCode={enableCode}
                submitHandler={sumbitHandler}
                message={message}
                setMessage={setMessage}
            />
        </section>
    )
}