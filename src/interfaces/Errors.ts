enum Errors {
  BAD_GETAWAY = 'Unable to request partner\'s data',
  BAD_REQUEST = 'Unexpected Request Syntax',
  FORBIDDEN = 'Invalid Authorization Token',
  INTERNAL_SERVER_ERROR = 'Unexpected Issue',
  NETWORK_FAILURE = 'Network Failure',
  NOT_FOUND = 'The information you are requesting does not exists',
  PAYLOAD_TOO_LARGE = 'Payload size exceeds the limit',
  WRONG_DATE = 'There is an issue with the date',
}

export default Errors