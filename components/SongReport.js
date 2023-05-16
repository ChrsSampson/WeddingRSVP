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
    }, [])    

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
                            const key = Math.random() * 1000 + song.song;
                            return (
                                <tr key={key}>
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