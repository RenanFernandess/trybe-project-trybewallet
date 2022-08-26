export const REQUEST_API = 'REQUEST_API';
export const RESPONSE = 'RESPONSE';
export const USER = 'USER';
export const WALLET = 'WALLET';

export const userAction = (payload) => ({ type: USER, payload });

export const walletAction = (payload) => ({ type: WALLET, payload });

const requestAction = () => ({ type: REQUEST_API });
