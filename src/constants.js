const Collections = Object.freeze({
    USERS: 'users',
    SESSIONS: 'sessions',
    TRANSACTIONS: 'transactions',
});
const StatusCode = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
});
const TransactionsType = Object.freeze({
    DEBIT: 'debit',
    CREDIT: 'credit',
});
  
export { Collections, StatusCode, TransactionsType };