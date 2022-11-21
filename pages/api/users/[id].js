// api/user/[id] - get info about a user

import User from '../../../database/userModel';
import Party from '../../../database/partyModel';
import Response from '../../../lib/response';
import requestParser from '../../../lib/requestParser';

export default async function handler (req, res) {
    const {method} = req;
    const id = req.query.id;
    try{
        if(method === "GET") {
            // get user info
            const user = await User.findById(id).populate('party');
            if (user) {
                const response = new Response(200, 'User found', user);
                res.status(200).json(response);
            } else {
                const response = new Response(404, 'User not found');
                res.status(404).json(response);
            }
        } else if (method === "PUT") {
            try{
                const data = requestParser(req.body);
                const user = await User.findOneAndUpdate({'_id': id}, data);
                // if the user has a party and the party does not have the user add the user to the party
                if(data.party && !user.party){
                    await Party.findByIdAndUpdate(data.party, {$push: {users: id}});
                // if the user has a party and the party is different from the party they are trying to update to, remove the user from the old party and add them to the new party
                } else if (data.party && user.party && data.party !== user.party) {
                    await Party.findByIdAndUpdate(user.party, {$pull: {users: id}});
                    await Party.findByIdAndUpdate(data.party, {$push: {users: id}});
                // if the user does not have a party and they are trying to update to a party, add the user to the party
                } else if (!data.party && user.party) {
                    await Party.findByIdAndUpdate(user.party, {$pull: {users: id}});
                }
                // respond
                const response = new Response(200, 'success', user);
                res.status(response.status).json(response);
            } catch (err) {
                // respond with error
                const error = new Error(err);
                throw error;
            }
        } else if (method === 'DELETE') {
            // delete one party by id
            try{
                const result = await User.findByIdAndDelete(id);
                // respond
                const response = new Response(200, 'success', result);
                res.status(response.status).json(response);
            } catch (err) {
                // respond with error
                console.log(err)
                const response = new Response(500, err.message, null, err);
                res.status(response.status).json(response);
            }
        } else {
            const response = new Response(405, 'Method not allowed');
            res.status(405).json(response);
        }
    } catch (err) {
        console.log(err)
        const response = new Response(500, err.message , null, err);
        res.status(response.status).json(response);
    }
};