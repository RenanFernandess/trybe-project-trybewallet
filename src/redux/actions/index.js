export const REQUEST_API = 'REQUEST_API';
export const RESPONSE = 'RESPONSE';
export const USER = 'USER';
export const WALLET = 'WALLET';

export const userAction = (payload) => ({ type: USER, payload });

export const walletAction = (payload) => ({ type: WALLET, payload });

const requestAction = () => ({ type: REQUEST_API });

export const responseAction = (payload) => ({ type: RESPONSE, payload });

export default function fetchAPI() {
  return async (describe) => {
    describe(requestAction());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    describe(responseAction(data));
  };
}
