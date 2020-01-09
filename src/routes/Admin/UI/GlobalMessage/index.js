import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import GlobalMessageComponent from '../../../../components/Admin/UI/GlobalMessage';

class GlobalMessage extends Component {
  render() {
    const { match: { params: { queryParams } } } = this.props;
    const params = JSON.parse(Base64.decode(queryParams)) || {};
    return (
      <GlobalMessageComponent param={params} />
    );
  }
}

export default GlobalMessage;
