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

export function recipient(state = {to : {}, cc: {}, bcc: {}}, action) {
  switch (action.type) {
    case actionTypes.ADD_RECIPIENT:
      return _.assign({}, state, {to: _.assign(state.to, action.members)});
    case actionTypes.ADD_RECIPIENT_CC:
      return _.assign({}, state, {cc: _.assign(state.cc, action.members)});
    case actionTypes.ADD_RECIPIENT_BCC:
      return _.assign({}, state, {bcc: _.assign(state.bcc, action.members)});
    case actionTypes.REMOVE_RECIPIENT:
      return removeRecipients(state, action.members);
    default:
      return state;
  }
}

function removeRecipients(recipients, members) {
  return {
    to: _.omit(recipients.to, _.keys(members)),
    cc: _.omit(recipients.cc, _.keys(members)),
    bcc: _.omit(recipients.bcc, _.keys(members))
  };
}
