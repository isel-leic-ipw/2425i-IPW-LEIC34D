import { INTERNAL_ERROR_CODES } from '../commons/errors.mjs';

function HttpResponse(status, e) {
    this.status = status;
    this.body = {
        code: e.code, // internal code
        error: e.description
    };
}

export function errorToHttp(e) {
    switch(e.code) {
        case INTERNAL_ERROR_CODES.MISSING_PARAMETER: return new HttpResponse(400, e);
        case INTERNAL_ERROR_CODES.INVALID_PARAMETER: return new HttpResponse(400, e);
        case INTERNAL_ERROR_CODES.INVALID_BODY: return new HttpResponse(400, e);
        case INTERNAL_ERROR_CODES.INVALID_ARGUMENT: return new HttpResponse(400, e);
        case INTERNAL_ERROR_CODES.TASK_NOT_FOUND: return new HttpResponse(404, e);
        case INTERNAL_ERROR_CODES.USER_NOT_FOUND: return new HttpResponse(401, e);
        case INTERNAL_ERROR_CODES.NOT_AUTHORIZED: return new HttpResponse(401, e);
        case INTERNAL_ERROR_CODES.MISSING_TOKEN: return new HttpResponse(401, e)
        default: return new HttpResponse(500, "Internal server error. Contact your teacher!");
    }
}