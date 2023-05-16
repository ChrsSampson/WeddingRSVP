import {useEffect, useState} from 'react';

// steak: 1
// salmon: 2
// nineGem: 3

export default function FoodReport ({users}) {

    const [quantity, setQuantity] = useState({steak: 0, salmon: 0, nineGem: 0});

    function formatList () {
        // filter food options
        let steak = 0;
        let salmon = 0;
        let nineGem = 0;

        users.forEach(element => {
            const selection = parseInt(element.foodSelection)
            if(element.attending){
                if(selection === 1) {
                    steak++;
                } else if(selection === 2) {
                    salmon++;
                } else if(selection === 3) {
                    nineGem++;
                }
            }
        });

        setQuantity({steak, salmon, nineGem});
    }


    function convertFood (int) {
        const r = parseInt(int)
        switch(r) {
            case 1:
                return 'Fillet Mignon';
            case 2:
                return 'Salmon';
            case 3:
                return 'Nine-Gem';
            default:
                return 'No Selection';
        }
    }

    useEffect(() => {
        formatList()
    }, [])    

    return (
        <section className='container'>
            <article>
                <h2>Food Report</h2>
                <div className="container">
                    <h4>Fillet Mignon: {quantity.steak}</h4>
                    <h4>Salmon: {quantity.salmon}</h4>
                    <h4>Nine-Gem: {quantity.nineGem}</h4>
                </div>
            </article>

            <table>
                <thead>
                    <tr>
                        <th>Food Selection</th>
                        <th>Restrictions</th>
                        <th>Person</th>
                    </tr>
                    {
                       users && users.map((user, i) => {
                            // random key
                            const key = Math.random() * 1000 + user._id;

                            return (
                                <tr key={key}>
                                    <td>{convertFood(user.foodSelection)}</td>
                                    <td>{user.allergies || "None Specified"}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                </tr>
                            )
                       })
                    }
                </thead>
            </table>
        </section>
    )
}