import {RSAA, isRSAA} from 'redux-api-middleware';
import {tryParseJSON} from '../../../utils/json';

async function enhanceHeaders(store, next, action) {
    const {[RSAA]: RSAAction, ...rest} = action;

    const additionalHeaders = {};

    if (RSAAction.body && tryParseJSON(RSAAction.body)) {
        additionalHeaders['Content-Type'] = 'application/json';
    }

    const enhancedRSAA = {
        ...rest,
        [RSAA]: {
            method: 'GET',
            ...RSAAction,
            options: {
                ...RSAAction.options,
            },
            headers: {
                ...additionalHeaders,
                ...RSAAction.headers,
            },
        },
    };

    return next(enhancedRSAA);
}

export default (store) => (next) => (action) => {
    if (isRSAA(action)) {
        return enhanceHeaders(store, next, action);
    }

    return next(action);
};
