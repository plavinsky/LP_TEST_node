import {expressifyResponse} from "../helpers/responseHelper.js";
import {requestUser, updateUser} from "../controllers/userController.js";
import {getuserIdByURL} from "../utils/commonUtils.js";

export class Router {
    _req = null;
    _res = null;

    constructor(req, res) {
        expressifyResponse(res);
        this._req = req;
        this._res = res;
    }

    async do() {

        if (this._req.url === '/') {
            return this._res.status(200).end('Waiting for request');
        }

        return this._res.status(404).end('Wrong URL');
    }

}

export class UserRouter extends Router {

    constructor(req, res) {
        super(req, res);
    }

    async do() {
        if (this._req.url.includes('requestUser')) {
            return await this.getUserFromFS();
        }

        if (this._req.url.includes('updateUser')
            && (this._req.method === 'POST')) {
            return await this.updateUserFS()
        }

        await super.do();
    }

    async getUserFromFS() {

        const requestUserID = getuserIdByURL(this._req.url);
        if (requestUserID)
            return this._res.status(200).json(await requestUser(requestUserID));
        else
            return this._res.status(200).end('wrong id');
    }

    async updateUserFS() {
        let body = '';

        //get body from post request
        this._req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                this._req.connection.destroy();
        });

        this._req.on('end', async () => {
            const updateResult = await updateUser(JSON.parse(body));
            return this._res.status(200).json(updateResult);
        });
    }
}