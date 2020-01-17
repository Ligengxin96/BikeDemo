import React, { Component } from 'react';
import { connect } from 'dva';
import AdvancedTableComponent from '../../../../components/Admin/Tables/AdvancedTable';

class AdvancedTable extends Component {
  render() {
    const { dictionary } = this.props;
    return (
      <AdvancedTableComponent dictionary={dictionary} />
    );
  }
}

export default connect(({ globalModel }) => ({
  dictionary: globalModel.dictionary,
}))(AdvancedTable);

