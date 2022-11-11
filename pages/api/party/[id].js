// /api/party/[id] - find one party by id

import Party from '../../../database/partyModel.js';
import Response from '../../../lib/response.js';
import connectDB from '../../../database/connection.js';

export default async function handler (req, res) {
    connectDB();

    const {method} = req;
    const id = req.query.id;
    if (method === "GET"){
        // get one party by id
        try {
            // fill users with user info
            const party = await Party.findById(id)
            if (!party.populated('users') ) {
                await party.populate('users')
            }
            const response = new Response(200, 'success', party);
            res.status(response.status).json(response);
        } catch (err) {
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }
    } else if (method === "PUT") {
        // update one party by id
        try{
            const result = await Party.findByIdAndUpdate(id, req.body, {new: true});
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
    }
}