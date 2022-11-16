// renders a list of parties, names of the members of that party, and buttons to perform actions on that party (edit, delete, etc)

import Link from 'next/link';

export default function PartyList ({parties}) {
    return (
        <div className="container">
            <article className="toolbar">
                <h1>Parties</h1>
                <div className='fluid-container'>
                    <Link href="/app/party/new" className='btn'>
                        Add Party
                    </Link>
                </div>
            </article>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Members</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parties.map((party, index) => (
                        <tr key={index}>
                            <td>{party.name}</td>
                            <td>{party.inviteCode}</td>
                            <td>
                                {party.users.map((member, index) => (
                                    <div key={index}>
                                        {member.firstName} {member.lastName}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Link href={`/app/party/${party._id}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}