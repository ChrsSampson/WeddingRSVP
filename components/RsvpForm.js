// form where users can RSVP and provide additional info

import {useState} from 'react';
import capitalize from '../lib/capitalize';
import Image from 'next/image';

export default function RsvpForm (props) {

    const [attending, setAttending] = useState(props.attending || false);
    const [allergies, setAllergies] = useState(props.allergies || '');
    const [food, setFood] = useState(props.food || '');
    const [song, setSong] = useState(props.song || '');

    return (
        <form
            className="UserForm"
            style={{"borderColor": props.user.color}}
            onSubmit={(e) => props.handleSubmit(e, props.user._id, {attending, allergies, food, song})}
        >
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
            <div>
                <label htmlFor="food">Entree Selection</label>
                <select className="form-control" id="food" value={food} onChange={(e) => setFood(e.target.value)}>
                    <option value={""}>---Select Entree---</option>
                    <option value={1}>Fillet</option>
                    <option value={2}>Salmon</option>
                    <option value={3}>Nine-Gem</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="allergies">Allergies/Restrictions</label>
                <textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} />
            </div>
            <div>
                <label htmlFor="song">Song Request</label>
                <input value={song} onChange={(e) => setSong(e.target.value)} type="text" id="song" />
            </div>
            <div className="form-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}