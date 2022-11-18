//  handle login request

import User from '../../../database/userModel';
import Response from '../../../lib/response';
import connectDB from '../../../database/connection';
import bctypt from 'bcryptjs';
import Cookies from 'cookies'

export default async function handler (req, res) {
    const {method} = req;
    const {email, password, firstName, lastName, inviteCode} = req.body;
    if(method === "POST") {
        try{
            connectDB();
            if(email && password) {
                const user = await User.findOne({email: email});
                if(!user){
                    const error = new Error('User not found');
                    throw error;
                } else {
                    const result = await bctypt.compare(password, user.password);
                    if(result){
                        const userInfo = {
                            _id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            partyId: user.party,
                            color: user.color,
                            role: user.role
                        }
                        // set secure cookies on client
                        const cookies = new Cookies(req, res);
                        cookies.set('user', JSON.stringify(userInfo), {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 24 * 7,
                        })
                        cookies.set('session', 'true', {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 24 * 7,
                        })
                        const response = new Response(200, 'success', userInfo);
                        res.status(response.status).json(response);
                    } else {
                        const error = new Error('Incorrect Invite Info');
                        throw error;
                    }
                }
            } else if (firstName && lastName && inviteCode) {
                const user = await User.findOne({firstName, lastName}).populate('party');
                if(!user){
                    const response = new Response(404, 'error', null, 'User not found');
                    res.status(response.status).json(response);
                } else {
                    if(user.party.inviteCode === Number(inviteCode)){
                        const userInfo = {
                            _id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            party: user.party,
                            role: user.role
                        }
                        // set some cookies on client
                        const cookies = new Cookies(req, res);
                        cookies.set('user', JSON.stringify(userInfo), {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 24, // 1 day
                        })
                        cookies.set('session', 'true', {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 24, // 1 day
                        })
                        const response = new Response(200, 'success', userInfo);
                        res.status(response.status).json(response);
                    } else {
                        const response = new Response(401, 'error', null, 'Incorrect invite code');
                        res.status(response.status).json(response);
                    }
                }
            }
        } catch (err) {
            // respond with error
            const response = new Response(500, 'error', null, err.message || err);
            res.status(response.status).json(response);
        }

    } else {
        const response = new Response(res, 405, 'Method not allowed');
        res.status(response.status).json(response);
    }
}