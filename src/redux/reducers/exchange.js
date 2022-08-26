import { REQUEST_API, RESPONSE } from '../actions';

const INITIAL_STATE = {};

export default function exchange(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_API: return {
    ...state,
  };
  case RESPONSE: return {
    ...state,
    ...payload,
  };
  default: return state;
  }
}
