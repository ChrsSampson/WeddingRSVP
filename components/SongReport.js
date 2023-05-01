import {useState} from 'react';


export default function SongReport ({users}) {

    const [songs, setSongs] = useState([]);

    function formatList () {
        const items = users.map(user => {
            if(user.songRequests){
                return {song: user.songRequests, source: user.firstName + ' ' + user.lastName}
            }
        })
        setSongs(items)
    }


    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Source</th>
                    </tr>
                    {
                        songs.map(song => {
                            return (
                                <tr>
                                    <td>{song.song}</td>
                                    <td>{song.source}</td>
                                </tr>
                            )
                        })
                    }
                </thead>
            </table>
        </section>
    )
}