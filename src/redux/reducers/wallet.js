// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'WALLET': return {
    ...state,
    ...payload,
  };
  default: return state;
  }
}
