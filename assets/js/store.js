import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import _ from 'lodash';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    case 'NEW_TASK':
      return state;
    case 'UPDATE_TASK':
      return state;
    case 'DELETE TASK':
      return _.filter(state, (task) => task.id != action.task_id);
    default:
      return state;
  }
}

function cur_task(state = new Map(), action) {
  switch(action.type) {
    case 'GET_TASK':
      return action.data;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.data;
    case 'NEW_USER':
      return state;
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'DELETE_SESSION':
      return null;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, session, cur_task});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;