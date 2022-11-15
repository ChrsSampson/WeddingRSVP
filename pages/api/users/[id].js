// api/user/[id] - get info about a user

import User from '../../../database/userModel';
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
                const result = await User.findOneAndUpdate({'_id': id}, data, {new: true});
                // respond
                const response = new Response(200, 'success', result);
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
                const response = new Response(500, 'error', null, err);
                res.status(response.status).json(response);
            }
        } else {
            const response = new Response(405, 'Method not allowed');
            res.status(405).json(response);
        }
    } catch (err) {
        const response = new Response(500, err.message , null, err);
        res.status(response.status).json(response);
    }
};