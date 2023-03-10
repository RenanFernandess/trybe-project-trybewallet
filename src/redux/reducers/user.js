// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case USER: return {
    ...state,
    ...payload,
  };
  default: return state;
  }
}
