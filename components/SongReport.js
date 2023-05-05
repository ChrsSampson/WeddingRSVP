import {useEffect, useState} from 'react';


export default function SongReport ({users}) {

    const [songs, setSongs] = useState([]);

    function formatList () {
        const u = users.filter(user => {
            return (user.songRequests !== null) && (user.role === 'user')
        });

        const r = u.map(user => {
            return {song: user.songRequests, source: `${user.firstName} ${user.lastName}`}
        })

        return r;
    }

    useEffect(() => {
        setSongs (formatList() )
    }, [users])    

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Source</th>
                    </tr>
                    {
                       songs && songs.map(song => {
                            return (
                                <tr key={song.song}>
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