import {Router, UserRouter} from "./Routers.js";


export const mainRouter = async (req, res) => {

    const router = getRouterByURL(req, res);
    await router.do();
}

function getRouterByURL(req, res) {
    if (req.url.includes('User'))
        return new UserRouter(req, res);

    return new Router(req, res);
}

