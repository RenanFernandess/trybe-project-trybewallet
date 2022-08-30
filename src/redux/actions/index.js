export const REQUEST_API = 'REQUEST_API';
export const RESPONSE = 'RESPONSE';
export const USER = 'USER';
export const WALLET = 'WALLET';
export const DELETE_EXPENSE = 'DELETE';
export const TO_EDIT = 'TO_EDIT';

export const userAction = (payload) => ({ type: USER, payload });

export const walletAction = (payload) => ({ type: WALLET, payload });

export const deleteExpenseAction = (payload) => ({ type: DELETE_EXPENSE, payload });

export const toEditAction = (payload) => ({ type: TO_EDIT, payload });

const requestAction = () => ({ type: REQUEST_API });

export const responseAction = (payload) => ({ type: RESPONSE, payload });

export default function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAction());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(responseAction(data));
  };
}

export const walletFetchAPI = (obj) => (
  async (dispatch) => {
    dispatch(requestAction());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    obj.exchangeRates = data;
    dispatch(walletAction(obj));
  }
);
