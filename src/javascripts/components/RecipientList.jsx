import React from 'react';
import PropTypes from 'prop-types';
import BizcardList from './BizcardList';
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';
import '../../stylesheets/recipient-list.less';

class RecipientList extends React.Component {

  render() {
    var toRecipients = [];
    var ccRecipients = [];
    var bccRecipients = [];

    if(this.props.recipients) {
      toRecipients = _.values(this.props.recipients.to);
      ccRecipients = _.values(this.props.recipients.cc);
      bccRecipients = _.values(this.props.recipients.bcc);
    }

    var toList = <BizcardList
                    bizcards={toRecipients}
                    selectedBizcards={this.props.selectedRecipients}
                    onBizcardClick={this.props.onRecipientClick}
                 ></BizcardList>;
    var ccList = <BizcardList
                    bizcards={ccRecipients}
                    selectedBizcards={this.props.selectedRecipients}
                    onBizcardClick={this.props.onRecipientClick}
                 ></BizcardList>;
    var bccList = <BizcardList
                    bizcards={bccRecipients}
                    selectedBizcards={this.props.selectedRecipients}
                    onBizcardClick={this.props.onRecipientClick}
                 ></BizcardList>;
    return (
      <div className='recipient-list'>
        <div className='recipient-to-container'>
          <span className='recipient-to-header'>
            <FormattedMessage id="recipient-to" defaultMessage="To"/>
          </span>
          {toList}
        </div>
        <div className='recipient-cc-container'>
          <span className='recipient-cc-header'>
            <FormattedMessage id="recipient-cc" defaultMessage="cc"/>
          </span>
          {ccList}
        </div>
        <div className='recipient-bcc-container'>
          <span className='recipient-bcc-header'>
            <FormattedMessage id="recipient-bcc" defaultMessage="bcc"/>
          </span>
          {bccList}
        </div>
      </div>
    );
  }
}

RecipientList.propTypes = {
  recipients: PropTypes.object,
  selectedRecipients: PropTypes.array,
  onRecipientClick: PropTypes.func
}

export default RecipientList;
