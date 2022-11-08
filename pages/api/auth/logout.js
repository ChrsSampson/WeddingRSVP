// destroy user cookies

import Cookies from 'cookies';
import Response from '../../../lib/response';

export default async function hander (req, res) {
    const {method} = req;
    if(method === "POST") {
        const cookies = new Cookies(req, res);
        cookies.set('session', false);
        cookies.set('user', null);
        const response = new Response(200, 'Logged out');
        res.status(200).json(response);
    } else {
        const response = new Response(405, 'Method not allowed');
        res.status(405).json(response);
    }
}