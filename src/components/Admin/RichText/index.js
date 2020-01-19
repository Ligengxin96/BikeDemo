import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Card } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyModal from '../../myComponents/myModal';
import styles from '../../../style/common.less';

class RichText extends Component {
  state = {
    visible: false,
    editorContent: '', // 文本内容
    editorState: '', // 编辑操作内容
  };

  // 清空内容按钮点击事件
  handleClearContent = () => {
    this.setState({ editorState: '' });
  }

  // 获取输入的内容
  handleGetContent = () => {
    this.setState({ visible: true });
  }

  // 关闭弹窗
  handleCloseModal = () => {
    this.setState({ visible: false });
  }

   // 编辑暂存改变事件(这个事件先调用,改变编辑工具或者内容都会调用,然后调用onEditorChange事件)
   onEditorStateChange = (editorState) => {
     this.setState({ editorState });
   };

  // 文本输入框内容改变事件
  onContentStateChange = (editorContent) => {
    this.setState({ editorContent });
  };

  render() {
    const { visible, editorState, editorContent } = this.state;
    return (
      <React.Fragment>

        <Card className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
            <Button type="primary" onClick={this.handleGetContent}>获取HTML文本</Button>
          </div>
        </Card>

        <Card title="富文本编辑器" className={styles.myCard} style={{ height: 'calc(65vh)' }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
          />
        </Card>

        <MyModal
          title="富文本"
          width="calc(50vw)"
          visible={visible}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          {draftjs(editorContent)}
        </MyModal>

      </React.Fragment>
    );
  }
}

export default RichText;
