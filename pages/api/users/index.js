// user CRUD operations

import User from '../../../database/userModel.js';
import Response from '../../../lib/response.js';
import connectDB from '../../../database/connection.js';
import mongoose from 'mongoose';

export default async function handler (req, res) {
    const {method} = req;

    // connect to database
    connectDB();

    // get all users from database (admin only)
    async function getAllUsers () {
        try{
            const result = await User.find({});
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
            const pid = mongoose.Types.ObjectId(party);
            const user = new User({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                party: pid
            })
            const result = await user.save(user);
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
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