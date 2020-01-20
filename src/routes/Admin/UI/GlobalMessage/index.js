import React, { Component } from 'react';
import lodash from 'lodash';
import { Base64 } from 'js-base64';
import GlobalMessageComponent from '../../../../components/Admin/UI/GlobalMessage';

class GlobalMessage extends Component {
  render() {
    const queryParams = lodash.get(this.props, 'match.params.queryParams', '');
    const params = queryParams ? JSON.parse(Base64.decode(queryParams)) : {};
    return (
      <GlobalMessageComponent param={params} />
    );
  }
}

export default GlobalMessage;
