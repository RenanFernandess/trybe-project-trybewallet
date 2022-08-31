// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  WALLET, REQUEST_API, RESPONSE, DELETE_EXPENSE, TO_EDIT, SAVE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_API: return {
    ...state,
  };
  case RESPONSE: {
    delete payload.USDT;
    return {
      ...state,
      currencies: Object.keys(payload),
    };
  }
  case SAVE_EDIT: return {
    ...state,
    expenses: [...payload],
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: payload,
  };
  case TO_EDIT: return {
    ...state,
    ...payload,
  };
  case WALLET: return {
    ...state,
    expenses: [...state.expenses, payload],
  };
  default: return state;
  }
}
