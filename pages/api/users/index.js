// user CRUD operations

import User from '../../../database/userModel.js';
import Response from '../../../lib/response.js';
import mongoose from 'mongoose';
import requestParser from '../../../lib/requestParser.js';

export default async function handler (req, res) {
    const {method} = req;

    // get all users from database (admin only)
    async function getAllUsers () {
        try{
            const result = await User.find({}).populate('party');
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    }

    async function createUser () {
        try{
            const {email, firstName, lastName, password, party} = req.body;
            let pid = ''
            if(party && party.length > 0) {
                pid = mongoose.Types.ObjectId(party);
            } else {
                pid = null;
            }
            const userData = requestParser({email, firstName, lastName, password, party: pid});
            const user = new User(userData);
            const result = await user.save()
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            console.log(err)
            const response = new Response(500, err.message, null, err);
            res.status(response.status).json(response);
        }
    }


    switch (method) {
        case 'GET':
            getAllUsers();
            break;
        case 'POST':
            createUser();
            break;
        default:
            res.status(400).json(new Response(400, 'error', null, 'unsupported method'));
    }
}