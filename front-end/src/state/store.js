import { createStore } from 'redux';

const initialState = { authenticated: false };

const authenticate = () =>({
  type: 'AUTHENTICATE',
  authenticated: true
})

const unAuthenticate = () =>({
  type: 'UNAUTHENTICATE',
  authenticated: false
})

const authentication = (state = [], action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return [
        ...state,
        {'authenticated': true}
      ]
    case 'UNAUTHENTICATE':
      return [...state,
        {'authenticated': false}
      ]
    default:
      return state
  }
}

const Store = createStore(authentication, initialState);

export default Store;
