
import User from '../../../database/userModel.js';
import EditUserForm from '../../../components/EditUserForm.js';
import {useRouter} from 'next/router';

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

export default function (props) {

    const user = JSON.parse(props.user);

    const router = useRouter();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })
            });
            router.push('/app');
        }   catch (err) {
            console.error(err);
        }   
    }


    return(
        <div className="container">
            <EditUserForm user={user} backRoute={'/app'} handleSubmit={handleSubmit} />
        </div>
    )
}