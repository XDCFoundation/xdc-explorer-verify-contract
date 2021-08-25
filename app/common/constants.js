/**
 * Created by Developer on 13/05/21.
 */

const httpConstants = {
    METHOD_TYPE: {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
    },
    HEADER_TYPE: {
        URL_ENCODED: "application/x-www-form-urlencoded",
        APPLICATION_JSON: "application/json",
    },
    HEADER_KEYS: {
        CONTENT_TYPE: "Content-Type",
        ACCEPT: "Accept",
        AUTHORIZATION: "Authorization",
        DEVICE_TYPE: "device-type",
        DEVICE_ID: "device-id",
        SESSION_TOKEN: "session-token",
        PUSH_TOKEN: "push-token",
    },
    DEVICE_TYPE: {
        ANDROID: "android",
        IOS: "ios",
        WEB: "web",
    },
    CONTENT_TYPE: {
        URL_ENCODE: "application/x-www-form-urlencoded",
    },

    RESPONSE_STATUS: {
        SUCCESS: true,
        FAILURE: false,
    },
    RESPONSE_CODES: {
        UNAUTHORIZED: 401,
        SERVER_ERROR: 500,
        NOT_FOUND: 404,
        OK: 200,
        NO_CONTENT_FOUND: 204,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        GONE: 410,
        UNSUPPORTED_MEDIA_TYPE: 415,
        TOO_MANY_REQUEST: 429,
    },
    LOG_LEVEL_TYPE: {
        INFO: "info",
        ERROR: "error",
        WARN: "warn",
        VERBOSE: "verbose",
        DEBUG: "debug",
        SILLY: "silly",
        FUNCTIONAL: "functional",
        HTTP_REQUEST: "http request",
    },
};

const genericConstants = {
    DEVICE_TYPE: {},
    hospitalStatus: {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
        INSTALLATION_SCHEDULED: "INSTALLATION_SCHEDULED",
    },
};

const apiSuccessMessage = {
    FETCH_SUCCESS: "Information fetched successfully",
    SEARCH_SUCCESSFULL: "Data searched successfully",
};

const apiEndpoints = {
    API_END_POINT: '/api-end-point'
};

const apiFailureMessage = {
    INVALID_PARAMS: "Invalid Parameters",
    FETCH_FAIL: "Could not fetch",
    INVALID_REQUEST: "Invalid Request",
    INVALID_SESSION_TOKEN: "Invalid session token",
    INTERNAL_SERVER_ERROR: "Internal server Error",
    BAD_REQUEST: "Bad Request!",
    DEVICE_ID_OR_SESSION_TOKEN_EMPTY:
        "Device id or session token can't be empty or null",
    SESSION_GENERATION: "Unable to generate session!",
    SESSION_EXPIRED: "Session Expired!",
};

const permissionIdentifier = {
    API_PERMISSION_ID: ["USER:CREATE"],   // ENTITY:OPERATION
};

module.exports = {
    apiFailureMessage, apiEndpoints, apiSuccessMessage, genericConstants, httpConstants
}
