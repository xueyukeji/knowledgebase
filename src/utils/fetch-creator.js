import 'isomorphic-fetch';
// import Cookies from 'js-cookie';

const URL_PREFIX = process.env.NODE_ENV === 'development' ? '/apps/' : '/apps/';

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
            // 'ct': Cookies.get('ct'),
            // 'ct': 'hvblyn808c71a20ed10804a0f8dd246f7922dbf86d200861f51c3f0717d1557c71063bbc8edf0150766646501012602100000000000',
            'ct':
            'g03juh578vt7a5076ba50b434462e4e517681a5a3f51041b5c5005c2978c85c30a6b67767f630150766692679000000000000000000',
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
