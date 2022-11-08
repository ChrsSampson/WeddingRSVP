// user CRUD operations

import User from '../../../database/userModel.js';
import Response from '../../../lib/response.js';
import connectDB from '../../../database/connection.js';

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

    async function createUser (data) {
        try{
            const {email, firstName, lastName, password, partyId} = data;
            const user = new User({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                partyId: partyId
            })

            const result = await user.save(user);
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    }

    async function updateUser (data) {
        try{
            const result = await User.findByIdAndUpdate(data._id, data, {new: true});
            // respond
            const response = new Response(200, 'success', result);
            res.status(response.status).json(response);
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err);
            res.status(response.status).json(response);
        }
    }

    async function deleteUser (id) {
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
    }

    switch (method) {
        case 'GET':
            getAllUsers();
            break;
        case 'POST':
            createUser(req.body);
            break;
        case 'PUT':
            updateUser(req.body);
            break;
        case 'DELETE':
            deleteUser(req.body._id);
            break;
        default:
            res.status(400).json(new Response(400, 'error', null, 'unsupported method'));
    }




}