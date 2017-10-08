import 'isomorphic-fetch';
import Cookies from 'js-cookie';

const URL_PREFIX = process.env.NODE_ENV === 'development' ? '/' : '/apps/';

const checkStatus = response => {
    if (response.status < 300) {
        return response;
    } else {
        throw response;
    }
}

function createQuery(method, body) {
    const query = {
        'method': method,
        'headers': {
            'ct': Cookies.get('ct'),
            // 'ct': '9miqzc6qxfxld23d2621cb4ed31f36a587d264c7658a5cbe63ea2296c82606e84f50f92947340150745385679000000000000000000',
            'cv': '3.5.0',
            'Accept': 'application/json',
            'Content-type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        },
        'credentials': 'include'
    }
    if (body) {
        query.body = JSON.stringify(body);
    }
    return query;
}

export const createFetch = (param) => {
    if (!param.method) {
        param.method = 'get';
    }
    if (param.method === 'GET' || param.method === 'get') {
        if (param.params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(param.params).forEach(key => paramsArray.push(key + '=' + param.params[key]))
            if (param.url.search(/\?/) === -1) {
                param.url += '?' + paramsArray.join('&')
            } else {
                param.url += '&' + paramsArray.join('&')
            }
        }
    }
    return fetch(URL_PREFIX + param.url, createQuery(param.method, param.body))
        .then(checkStatus)
        .then(res => res.json())
}
