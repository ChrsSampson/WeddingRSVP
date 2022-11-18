// form to edit or create a party

import {useState, useEffect} from 'react'
import Link from 'next/link'


export default function PartyForm ({create, party, handleSubmit, handleDelete, message, backRoute}) {

    const [term, setTerm] = useState('');
    const [users, setUsers] = useState([]);
    // set of users that match the search term
    const [filtered, setFiltered] = useState();

    const [name, setName] = useState(party ? party.name : '');
    const [inviteCode, setInviteCode] = useState(party ? party.inviteCode : '');
    const [members, setMemebers] = useState(party && party.users ? party.users : []);
    const [error, setError] = useState('');

    useEffect(() => {
        if(!create) {
            // fetch users
            fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    setUsers([...data.data]);
                } else {
                    const error = new Error(data.message)
                    throw error;
                }
            })
            .catch(err => setError(err.message));
        }
    }, [])

    useEffect(() => {
        filterUsers(term);
    }, [term])

    function filterUsers (term) {
        const filtered = users.filter(user => user.firstName.toLowerCase().includes(term.toLowerCase()));
        setFiltered(filtered);
    }

    function handleRemoveMember (id) {
        const newMembers = members.filter(member => member._id !== id);
        setMemebers(newMembers);
    }

    const formData = {
        name: name,
        users: members,
    }

    return (
        <form className="UserForm" onSubmit={(e) => handleSubmit(e, formData)}>
            <div className="form-group">
                <label htmlFor="name">Party Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {party && party.inviteCode ?
                <div className="form-group">
                    <label htmlFor="inviteCode">Invite Code</label>
                    <input type="text" className="form-control" id="inviteCode" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
                </div>
                :
                null
            }
            <div className='form-group'>
                <label htmlFor="user-search">Add User</label>
                <input type="text" className="form-control" id="user-search" value={term} onChange={(e) => setTerm(e.target.value)} />
                {/* drop down */}
                {term.length > 0 && filtered && filtered.length ?
                    <div className="dropdown">
                        <ul className="dropdown-menu">
                            {filtered.map((user, i) => {
                                return (
                                    <li key={i} className="dropdown-item" onClick={() => {
                                        setMemebers([...members, user]);
                                        setTerm('');
                                    }}>
                                        {user.firstName} {user.lastName}
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
            <div className="form-group">
                <label htmlFor="members">Current Members</label>
                <ol>
                    { members.length > 0 ? members.map((member, i) => {
                            return (
                                // member are removable on click
                                <li key={i} onClick={(e) => handleRemoveMember(member._id) }>
                                    <p>{member.firstName} {member.lastName}</p>
                                </li>
                            )
                        })
                        :
                        <span>No Members yet</span>
                    }
                </ol>
            </div>
            <div className="fluid-container">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="logout-btn">
                    <Link href="/app">
                        Back
                    </Link>
                </button>
                {!create &&
                    <button className='danger-btn' onClick={(e) => handleDelete(e, party._id)}>
                        Delete
                    </button>
                }
            </div>
        </form>    
    )

}