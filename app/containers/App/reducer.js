import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  viewer: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VIEWER':
      return state
        .set('viewer', action.viewer);
    default:
      return state;
  }
}

export default appReducer;
