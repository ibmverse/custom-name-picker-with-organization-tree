import _ from 'lodash';

import actionTypes from '../actions/actionTypes';
import {
  fetchOrgRequest,
  fetchOrgComplete,
  fetchOrgFail,
  fetchDepartmentMemberRequest,
  fetchDepartmentMemberComplete,
  fetchDepartmentMemberFail,
  addRecipient,
  removeRecipient
} from '../actions/actions';

export function org(state = { data : {}}, action) {
  switch (action.type) {
    case actionTypes.FETCH_ORG_REQUEST:
      return _.assign({}, state, {isFetching: true});
    case actionTypes.FETCH_ORG_COMPLETE:
      return _.assign({}, state, {isFetching: false, data: action.data});
    case actionTypes.FETCH_ORG_FAIL:
      return _.assign({}, state, {isFetching: false, error: action.error});
    default:
      return state;
  }
}

export function department(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_DEPARTMENT_REQUEST:
      return _.assign({}, state, {
          [action.department]: {
            isFetching: true
          }
        }, {selected: action.department});
    case actionTypes.FETCH_DEPARTMENT_COMPLETE:
      return _.assign({}, state, {
        [action.department]: {
          isFetching: false,
          members: action.members
        }
      });
    case actionTypes.FETCH_DEPARTMENT_FAIL:
      return _.assign({}, state, {
        [action.department]: {
          isFetching: false,
          error: action.error
        }
      });
    default:
      return state;
  }
}

export function recipient(state = {}, action) {
  switch (action.type) {
    case actionTypes.ADD_RECIPIENT:
      return _.assign({}, state, action.members);
    case actionTypes.REMOVE_RECIPIENT:
      return _.omit(state, _.keys(action.members));
    default:
      return state;
  }
}
