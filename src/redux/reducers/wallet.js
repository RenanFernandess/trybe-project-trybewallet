// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET, REQUEST_API, RESPONSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  delete payload.USDT;

  switch (type) {
  case REQUEST_API: return {
    ...state,
  };
  case RESPONSE: return {
    ...state,
    currencies: Object.keys(payload),
  };
  case WALLET: return {
    ...state,
    ...payload,
  };
  default: return state;
  }
}
