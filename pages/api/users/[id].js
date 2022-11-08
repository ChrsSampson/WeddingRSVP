// api/user/[id] - get info about a user

import User from '../../../database/userModel';
import response from '../../../lib/response';

export default async function handler (req, res) {
    const {method} = req;
    if(method === "GET") {
        // get user info
        const {id} = req.query;
        const user = await User.findById(id)
        if (user) {
            const response = new response(200, 'User found', user);
            res.status(200).json(response);
        } else {
            const response = new response(404, 'User not found');
            res.status(404).json(response);
        }
    } else {
        const response = new Response(405, 'Method not allowed');
        res.status(405).json(response);
    }
}