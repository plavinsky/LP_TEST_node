
export function isNumber(val) {
    return val === +val;
}

export function getuserIdByURL(url) {
    const requestUserRegex = new RegExp(/\/requestUser\/(.+)/gm);
    const requestUserRegexExec = requestUserRegex.exec(url);
    return  requestUserRegexExec?.length ? requestUserRegexExec[1] : null;

}