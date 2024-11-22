// Define all possible application errors

export const INTERNAL_ERROR_CODES = {
    MISSING_PARAMETER: 1,
    INVALID_PARAMETER: 2,
    INVALID_BODY: 3,
    TASK_NOT_FOUND: 4,
    USER_NOT_FOUND: 5,
    NOT_AUTHORIZED: 6,
    MISSING_TOKEN: 7
};

export const errors = {
    MISSING_PARAMETER: (argName) => {
        return new Error(INTERNAL_ERROR_CODES.MISSING_PARAMETER, `Missing parameter`);
    },
    INVALID_PARAMETER: (argName) => {
        return new Error(INTERNAL_ERROR_CODES.INVALID_PARAMETER, `Invalid parameter ${argName}`);
    },
    INVALID_BODY: (argName) => {
        return new Error(INTERNAL_ERROR_CODES.INVALID_BODY, `Invalid body ${argName}`);
    },
    TASK_NOT_FOUND: (what) => { 
        return new Error(INTERNAL_ERROR_CODES.TASK_NOT_FOUND,`Task ${what} not found`);
    },
    USER_NOT_FOUND: () => { 
        return new Error(INTERNAL_ERROR_CODES.USER_NOT_FOUND,`User not found`);
    },
    NOT_AUTHORIZED: (who, what) => { 
        return new Error(INTERNAL_ERROR_CODES.NOT_AUTHORIZED,`${who} has no access to ${what}`);
    },
    MISSING_TOKEN: () => { 
        return new Error(INTERNAL_ERROR_CODES.MISSING_TOKEN,`Missing token`);
    }
}

// Constructor function
function Error(code, description) {
    this.code = code;
    this.description = description;
}