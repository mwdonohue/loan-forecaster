const ERROR_TABLE = {
    "NOT_INTEGER": "must be an integer",
    "EMPTY": "is required",
    "IS_NAN": "must be a number",
    "OUT_OF_RANGE": "is out of range",
    "LESS_THAN_1": "must be greater than zero"
}

// Returns array of strings containing error messages
export function getErrorMessage(field, error) {
    return field + " " + ERROR_TABLE[error]
}