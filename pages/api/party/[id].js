// /api/party/[id] - find one party by id

import User from '../../../database/userModel';
import Party from '../../../database/partyModel';
import Response from '../../../lib/response';

export default async function handler (req, res) {

    const {method} = req;
    const id = req.query.id;
    if (method === "GET"){
        // get one party by id
        try {
            // fill users with user info
            const party = await Party.findById(id).populate('users');
            // if (!party.populated('users') ) {
            //     await party.populate('users')
            // }
            const response = new Response(200, 'success', party);
            res.status(response.status).json(response);
        } catch (err) {
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }
    } else if (method === "PUT") {
        // update one party by id
        try{
            const updateData = req.body;
            const updatedparty = await Party.findByIdAndUpdate(id, updateData, {new: true});
            // find all the users in with the party id
            const usersWithParty = await User.find({party: id});
            // for each user, if their id is not in the users array, remove the party from the user
            usersWithParty.forEach(async (user, index) => {
                if(!updateData.users.includes(user._id)){
                    user.party = null;
                    await user.save();
                }
            });

            updatedparty.users.forEach(async (user, index) => {
                if(user.party !== id){
                    const  u = await User.findById(user._id);
                    u.party = id;
                    await u.save();
                }
            });

            // respond
            const response = new Response(200, 'success', updatedparty);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }
    } else if (method === "PATCH") {
        // add user to party
        try{
            const result = await Party.findByIdAndUpdate(id, {$push: {users: req.body.user}}, {new: true});
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }

    } else if (method === 'DELETE') {
        // delete one party by id
        try{
            const result = await Party.findByIdAndDelete(id);
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    } else {
        // respond with error
        const response = new Response(500, 'error', null, 'method not supported');
        res.status(response.status).json(response);
    }
}