// form where users can RSVP and provide additional info

import {useState} from 'react';
import capitalize from '../lib/capitalize';
import Image from 'next/image';

export default function RsvpForm (props) {

    const [attending, setAttending] = useState(props.attending || false);
    const [allergies, setAllergies] = useState(props.allergies || '');
    const [food, setFood] = useState(props.foodSelection || '');
    const [song, setSong] = useState(props.songRequest || '');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    function handleSubmit (e) {
        e.preventDefault();
        const data = {
            attending,
            allergies: allergies,
            foodSelection: food !== "" ? food : null,
            party: props.user.party._id,
            songRequests: song
        }
        
        fetch(`/api/users/${props.user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setMessage('Saved!')
            }
            clearMessages();
        })   
        .catch(err => setError(err))

    }

    function clearMessages () {
        setTimeout(() => {
            setMessage(null);
            setError(null);
        }, 3000);
    }

    function determinUnsavedChanged () {
        // if any of the values are different from the props, return true
        if (attending !== props.attending) return true; 
        if (allergies !== props.allergies) return true;
        if (food !== props.foodSelection) return true;
        if (song !== props.songRequest) return true;
        return false;
    }

    return (
        <form className="UserForm" style={{"borderColor": props.user.color}} onSubmit={e => handleSubmit(e)}>
            <div className="fluid-container">
                <h3>{capitalize(props.user.firstName)} {capitalize(props.user.lastName)}</h3>
                <Image
                        className="user-avatar"
                        src={`https://avatars.dicebear.com/api/personas/${props.user.firstName + props.user.lastName}.svg`}
                        alt="user avatar"
                        width={50}
                        height={50}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="attending">Attending?</label>
                <select className="form-control" id="attending" value={attending} onChange={(e) => setAttending(e.target.value)}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor="food">Entree Selection</label>
                <select className="form-control" id="food" value={food} onChange={(e) => setFood(e.target.value)}>
                    <option value={""}>Select Entree</option>
                    <option value={1}>Fillet</option>
                    <option value={2}>Salmon</option>
                    <option value={3}>Nine-Gem</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="allergies">Allergies/Restrictions</label>
                <textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="song">Song Request</label>
                <input value={song} onChange={(e) => setSong(e.target.value)} type="text" id="song" />
            </div>
            <div>
                {
                    error && <span>{error.message}</span>
                }
                {
                    message && <i>{message}</i>
                }
                {
                    determinUnsavedChanged() && <i className="warning-txt">Unsaved Changes</i>
                }
            </div>
            <div className='form-group'>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}