// a component that renders a list of users and buttons to perform actions on that user (edit, delete, etc)

import Link from 'next/link';
import Image from 'next/image';
import UserSearchBar from './UserSearchBar';

export default function UserList ({users, handleSearch}) {
    return (
        <div className="container">
            <article className="toolbar">
                <h1>People</h1>
                <div className='fluid-container'>
                    <UserSearchBar handleSearch={handleSearch} />
                    <Link href="/app/users/new" className='btn'>
                        Add User
                    </Link>
                </div>
            </article>
            <table>
                <thead>
                    <tr>
                        <th>Attending</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Party</th>
                        <th>Invite Code</th>
                        <th>Role</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.attending ? "yes" : 'no'}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.party ? user.party.name : 'none'}</td>
                            <td>{user.party? user.party.inviteCode : 'N/A'}</td>
                            <td>{user.role === 'admin' ? 'Organizer' : 'Attendee'}</td>
                            <td>
                                <Link href={`/app/users/${user._id}`} className="btn">
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <Image
                                    className="user-avatar"
                                    src={`https://avatars.dicebear.com/api/personas/${user.firstName + user.lastName}.svg`}
                                    alt="user avatar"
                                    width={40}
                                    height={40}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}