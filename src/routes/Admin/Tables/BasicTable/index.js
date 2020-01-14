import React, { Component } from 'react';
import { connect } from 'dva';
import BasicTableComponent from '../../../../components/Admin/Tables/BasicTable';

class BasicTable extends Component {
  render() {
    const { dictionary } = this.props;
    return (
      <BasicTableComponent dictionary={dictionary} />
    );
  }
}

export default connect(({ globalModel }) => ({
  dictionary: globalModel.dictionary,
}))(BasicTable);
