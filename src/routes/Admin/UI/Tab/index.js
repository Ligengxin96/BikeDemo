import React, { Component } from 'react';
import lodash from 'lodash';
import TabComponent from '../../../../components/Admin/UI/Tab';

class Tab extends Component {
  render() {
    const { path, url } = lodash.get(this.props, 'match', '');
    const rootPath = path.substring(0, path.lastIndexOf('/'));
    return (
      <TabComponent path={url} rootPath={rootPath} />
    );
  }
}

export default Tab;
