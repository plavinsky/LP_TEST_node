import {requestUser, updateUser} from "../controllers/userController.js";
import {expressifyResponse, resEnd} from "../helpers/responseHelper.js";
import queryString from 'node:querystring';


export const userRouter = async (req, res) => {

    expressifyResponse(res);
    const url = req.url;
    const method = req.method;

    if (url.includes('favicon.ico')) {
        return res.status(204).end();
    }

    const requestUserRegex = new RegExp(/\/requestUser\/(.+)/gm);
    const requestUserRegexExec = requestUserRegex.exec(url);
    const requestUserID = requestUserRegexExec?.length ? requestUserRegexExec[1] : null;

    if (requestUserID) {
        const users = await requestUser(requestUserID);
        return res.status(200).json(users);
    }

    if (url.includes('/updateUser') && (method === 'POST') ) {
        let body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', async function () {
            let bodyObject = JSON.parse(body)
            const updateResult = await updateUser(bodyObject)

            res.status(200).json(updateResult);
        });
    }

    res.status(200).end('Waiting for request');
}
