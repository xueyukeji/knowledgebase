import 'isomorphic-fetch';
import Cookies from 'js-cookie';

let URL_PREFIX = '/apps/';
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
// c0cx8sdrf3qz3d41770c3e09977c6ed1d6a9540397163c78c5ebafe1effad298c94d159dc3850150917749911023600000000000000
// admin
// 84qetmszc857fa4e01ab687e817e7dd5f6c832b2cc188b59e37cbe8c966cd67f9cd4aeb75eb60150883748379000000000000000000
function createQuery(method, body) {
    const query = {
        method: method,
        headers: {
            ct:
                process.env.NODE_ENV !== 'development'
                    ? Cookies.get('ct')
                    : '1r6eaz9vr6fh599814348c5f7bc15d8860b74b74bafcc10af9aa0af74f19e0f5c1b1453082800151082829079000000000000000000',
            cv: '3.5.1',
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
            Object.keys(param.params).forEach(key => {
                if (param.params[key] instanceof Array) {
                    param.params[key].map(p => {
                        paramsArray.push(key + '=' + p)
                    })
                } else {
                    paramsArray.push(key + '=' + param.params[key])
                }
            });
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
