const httpStatus = {
    // Successful responses (200–299)
    OK: 200, // General success
    CREATED: 201, // Resource created successfully
    NO_CONTENT: 204, // Successful request with no content returned
  
    // Client error responses (400–499)
    BAD_REQUEST: 400, // Invalid request due to client error
    UNAUTHORIZED: 401, // Authentication required or failed
    FORBIDDEN: 403, // Client does not have permission
    NOT_FOUND: 404, // Resource not found
    CONFLICT: 409, // Conflict with current state of the resource
    UNPROCESSABLE_ENTITY: 422, // Invalid request format or content
  
    // Server error responses (500–599)
    INTERNAL_SERVER_ERROR: 500, // Unexpected server error
    NOT_IMPLEMENTED: 501, // Functionality not implemented
    SERVICE_UNAVAILABLE: 503, // Service unavailable, try again later
  };
  
  export default httpStatus;
  