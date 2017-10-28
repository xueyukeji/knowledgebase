import 'isomorphic-fetch';
import Cookies from 'js-cookie';

// TODO
// let URL_PREFIX = '/apps/';
let URL_PREFIX = '/';
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_PROXY) {
    URL_PREFIX = '/';
}

const checkStatus = response => {
    if (response.status < 300) {
        return response;
    } else {
        throw response;
    }
};
// a10 普通用户
// knkivoek71yia3f28ee81b4495339cc794f20cb55939608df36c5edd3dbdecdb5f1731b9229d0150840695411024500000000000000
// admin
// 84qetmszc857fa4e01ab687e817e7dd5f6c832b2cc188b59e37cbe8c966cd67f9cd4aeb75eb60150883748379000000000000000000
function createQuery(method, body) {
    const query = {
        method: method,
        headers: {
            ct:
            process.env.NODE_ENV !== 'development'
                ? Cookies.get('ct')
                : '84qetmszc857fa4e01ab687e817e7dd5f6c832b2cc188b59e37cbe8c966cd67f9cd4aeb75eb60150883748379000000000000000000',
            cv: '3.5.0',
            Accept: 'application/json',
            'Content-type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: 0
        },
        credentials: 'include'
    };
    if (body) {
        query.body = JSON.stringify(body);
    }
    return query;
}

export const createFetch = param => {
    if (!param.method) {
        param.method = 'get';
    }
    if (param.method === 'GET' || param.method === 'get') {
        if (param.params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(param.params).forEach(key =>
                paramsArray.push(key + '=' + param.params[key])
            );
            if (param.url.search(/\?/) === -1) {
                param.url += '?' + paramsArray.join('&');
            } else {
                param.url += '&' + paramsArray.join('&');
            }
        }
    }
    return fetch(URL_PREFIX + param.url, createQuery(param.method, param.body))
        .then(checkStatus)
        .then(res => res.json());
};
