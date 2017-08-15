import {connect} from 'react-redux';
import _ from 'lodash';
import NamePickerTable from '../components/NamePickerTable';
import {addRecipient, addRecipientCc, addRecipientBcc, removeRecipient} from '../actions/actions';

function getCandidatesFromState(state) {
  var selectedDepartmentId = state.department.selected;
  if(!selectedDepartmentId) {
    return [];
  } else {
    var selectedDepartment = state.department[selectedDepartmentId];
    return selectedDepartment.members || [];
  }
}

function getRecipientsFromState(state) {
  //return _.values(state.recipient);
  return state.recipient;
}

function isCandidatesLoading(state) {
  var selectedDepartmentId = state.department.selected;
  if(!selectedDepartmentId) {
    return false;
  } else {
    var selectedDepartment = state.department[selectedDepartmentId];
    return selectedDepartment.isFetching;
  }
}

const mapStateToProps = state => {
  return {
    isCandidatesLoading: isCandidatesLoading(state),
    candidates: getCandidatesFromState(state),
    recipients: getRecipientsFromState(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCandidatesAddTo: (candidates) => {
      dispatch(addRecipient(candidates));
    },
    onCandidatesAddCc: (candidates) => {
      dispatch(addRecipientCc(candidates));
    },
    onCandidatesAddBcc: (candidates) => {
      dispatch(addRecipientBcc(candidates));
    },
    onToRecipientsRemove: (recipients) => {
      dispatch(removeRecipient(recipients));
    }
  }
}

var container = connect(mapStateToProps, mapDispatchToProps)(NamePickerTable);

export default container;
