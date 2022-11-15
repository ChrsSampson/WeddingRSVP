
import User from '../../../database/userModel.js';
import EditUserForm from '../../../components/EditUserForm.js';
import {useRouter} from 'next/router';
import {useState} from 'react'

export async function getStaticProps (ctx) {
    const id = ctx.params.id;

    // data to be sent to the client
    const user = JSON.stringify ( await User.findById(id).populate('party') );

    return {
        props: {
            id: id,
            user: user
        }
    }
}

export function getStaticPaths (ctx) {

    return {
        paths: [
            { params: { id: '1' } },
        ],
        fallback: true
    }
}

export default function UserDetails (props) {
    const [message, setMessage] = useState('');

    const user = JSON.parse(props.user);
    const router = useRouter();

    const id = router.query.id

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })
            });
            if(res.status === 200) {
                router.push('/app');
            } else {
                setMessage(`Error: ${res.message}`);
            }
        }   catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            router.push('/app');
        }   catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="container">
            <EditUserForm user={user} message={message} backRoute={'/app'} handleSubmit={handleSubmit} handleDelete={handleDelete} />
        </div>
    )
}