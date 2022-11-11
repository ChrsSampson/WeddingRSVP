// party crud operations

import Party from '../../../database/partyModel.js';
import Response from '../../../lib/response.js';
import connectDB from '../../../database/connection.js';

export default async function handler (req, res) {
    const {method} = req;

    async function getAll () {
        try {
            const parties = await Party.find();
            const response = new Response(200, 'success', parties);
            res.status(response.status).json(response);
        } catch (err) {
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }
    }

    async function createOne (data) {
        try {
            const {name} = data;
            // invite codes needs to be sent here because the model requires it, it will be overwritten by the pre save hook
            const party = new Party({name, inviteCode: 123456});
            const newParty = await party.save();
            const response = new Response(200, 'success', newParty);
            res.status(response.status).json(response);
        } catch (err) {
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    }

    async function deleteOne () {
        try{
            const result = await Party.findByIdAndDelete(req.body._id);
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    }


    switch(method){
        case 'GET':
            getAll();
            break;
        case 'POST':
            createOne(req.body);
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}