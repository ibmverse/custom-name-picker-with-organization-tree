import React from 'react';
import PropTypes from 'prop-types';
import BizcardList from './BizcardList';
import ActionList from './ActionList';
import RecipientList from './RecipientList';
import _ from 'lodash';
import '../../stylesheets/name-picker-table.less';

import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';

/**
 * Used to render the name picker table, which contains a list of candidates,
 * action buttons and a list of selected recipients.
 *
 * It accepts properties for the candidates list and the recipient list.
 * Also, it exposes properties for callbacks when add/remove recipients actions are clicked.
 */
 class NamePickerTable extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
       selectedCandidiates: {},
       selectedRecipientsTo: {}
     };
     this.toggleCandidateSelection = this.toggleCandidateSelection.bind(this);
     this.toggleRecipientSelection = this.toggleRecipientSelection.bind(this);
   }

   toggleCandidateSelection(bizcard) {
     if(this.state.selectedCandidiates[bizcard.email]) {
       this.setState({selectedCandidiates: _.omit(this.state.selectedCandidiates, bizcard.email)});
     } else {
       this.setState({selectedCandidiates: _.assign({}, this.state.selectedCandidiates, {[bizcard.email]: bizcard})});
     }
   }

   toggleRecipientSelection(bizcard) {
     if(this.state.selectedRecipientsTo[bizcard.email]) {
       this.setState({selectedRecipientsTo: _.omit(this.state.selectedRecipientsTo, bizcard.email)});
     } else {
       this.setState({selectedRecipientsTo: _.assign({}, this.state.selectedRecipientsTo, {[bizcard.email]: bizcard})});
     }
   }

   createAddRecipientToAction() {
     const messages = defineMessages({
       addRecipients: {
         id: 'addRecipients',
         defaultMessage: 'Add Recipient'
       }
     });
     return {
       id: 'add-recipient-to',
       name: this.props.intl.formatMessage(messages.addRecipients),
       handler: () => {
         this.props.onCandidatesAddTo(this.state.selectedCandidiates);
         this.setState({selectedCandidiates: {}});
       }
     };
   }

   createAddRecipientCcAction() {
     const messages = defineMessages({
       addRecipientsCc: {
         id: 'addRecipientsCc',
         defaultMessage: 'Add cc'
       }
     });
     return {
       id: 'add-recipient-cc',
       name: this.props.intl.formatMessage(messages.addRecipientsCc),
       handler: () => {
         this.props.onCandidatesAddCc(this.state.selectedCandidiates);
         this.setState({selectedCandidiates: {}});
       }
     };
   }

   createAddRecipientBccAction() {
     const messages = defineMessages({
       addRecipientsBcc: {
         id: 'addRecipientsBcc',
         defaultMessage: 'Add bcc'
       }
     });
     return {
       id: 'add-recipient-bcc',
       name: this.props.intl.formatMessage(messages.addRecipientsBcc),
       handler: () => {
         this.props.onCandidatesAddBcc(this.state.selectedCandidiates);
         this.setState({selectedCandidiates: {}});
       }
     };
   }

   createRemoveRecipientToAction() {
     const messages = defineMessages({
       removeRecipients: {
         id: 'removeRecipients',
         defaultMessage: 'Remove Recipient'
       }
     });
     return {
       id: 'remove-recipient-to',
       name: this.props.intl.formatMessage(messages.removeRecipients),
       handler: () => {
         this.props.onToRecipientsRemove(this.state.selectedRecipientsTo);
         this.setState({selectedRecipientsTo: {}});
       }
     }
   }

   createRecipientToActionGroup() {
     return {
       id: 'to',
       actions: [this.createAddRecipientToAction(), this.createRemoveRecipientToAction()]
     };
   }

   createAddRecipientActionsGroup() {
     return {
       id: 'add',
       actions: [this.createAddRecipientToAction(),
         this.createAddRecipientCcAction(),
         this.createAddRecipientBccAction()]
     }
   }

   createRemoveRecipientActionsGroup() {
     return {
       id: 'remove',
       actions: [this.createRemoveRecipientToAction()]
     }
   }

   createActonList() {
     return [this.createAddRecipientActionsGroup(), this.createRemoveRecipientActionsGroup()];
   }

   render() {
     return (
       <table className='name-picker-table'>
         <tbody>
           <tr className='header'>
             <th><FormattedMessage id="candidates" defaultMessage="Candidates"/></th>
             <th></th>
             <th><FormattedMessage id="recipients" defaultMessage="Recipients"/></th>
           </tr>
           <tr>
             <td className='candidates'>
               <BizcardList
                 bizcards={this.props.candidates}
                 selectedBizcards={_.keys(this.state.selectedCandidiates)}
                 onBizcardClick={this.toggleCandidateSelection}
                 isLoading={this.props.isCandidatesLoading}
               ></BizcardList>
             </td>
             <td className='actions'>
               <ActionList actions={this.createActonList()}></ActionList>
             </td>
             <td className='recipients'>
               <RecipientList
                 recipients={this.props.recipients}
                 selectedRecipients={_.keys(this.state.selectedRecipientsTo)}
                 onRecipientClick={this.toggleRecipientSelection}
                 ></RecipientList>
             </td>
           </tr>
         </tbody>
      </table>
     );
   }
 }

 NamePickerTable.propTypes = {
   candidates: PropTypes.array,
   recipients: PropTypes.object,
   isCandidatesLoading: PropTypes.bool,
   onCandidatesAddTo: PropTypes.func,
   onCandidatesAddCc: PropTypes.func,
   onCandidatesAddBcc: PropTypes.func,
   onToRecipientsRemove: PropTypes.func
 }

 export default injectIntl(NamePickerTable);
