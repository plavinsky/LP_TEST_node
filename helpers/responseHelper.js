
export const resEnd = (res, strData, statusCode= 200, contentType = 'application/json') => {
    //res.statusCode = statusCode;
    expressifyResponse(res);

    res.setHeader('Content-Type', contentType);
    res.status(statusCode).end(strData);
}

export function expressifyResponse(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status = setStatusCode.bind(res);
    res.json = sendJson.bind(res);

}

function setStatusCode(statusCode) {
    this.statusCode = statusCode;
    return this;
}

function sendJson(data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
}

