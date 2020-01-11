import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';

const images = [
  ['1.png', '2.png', '3.png', '4.png', '5.png'],
  ['6.png', '7.png', '8.png', '9.png', '10.png'],
  ['11.png', '12.png', '13.png', '14.png', '15.png'],
  ['16.png', '17.png', '18.png', '19.png', '20.png'],
  ['21.png', '22.png', '23.png', '24.png', '25.png'],
];

class Gallery extends Component {
  state={
    visible: false,
    currentImageSrc: null, // 当前展示图片的url
  }

  /**
   * 打开弹窗,展示点击的图片
   * @param imageSrc 图片文件名
   */
  openGallery = (imageSrc) => {
    this.setState({
      visible: true,
      currentImageSrc: `/assets/gallery/${imageSrc}`,
    });
  }

  // 关闭图片弹窗
  closeGallery = (imageSrc) => {
    this.setState({
      visible: true,
      currentImageSrc: `/assets/gallery/${imageSrc}`,
    });
  }

  render() {
    const { visible, currentImageSrc } = this.state;
    const imageList = images.map(list => list.map(item => (
      <Card
        style={{ marginBottom: 10 }}
        // 图片需要放在public文件夹下的assets里面 才可以下面这样写路径
        cover={<img src={`/assets/gallery/${item}`} onClick={() => this.openGallery(item)} alt="" />}
      >
        <Card.Meta
          title="Freedom"
          description="想要有一天能走遍千山万水"
        />
      </Card>
    )));
    return (
      <div>
        <Row gutter={10}>
          <Col md={5}>
            {imageList[0]}
          </Col>
          <Col md={5}>
            {imageList[1]}
          </Col>
          <Col md={5}>
            {imageList[2]}
          </Col>
          <Col md={5}>
            {imageList[3]}
          </Col>
          <Col md={4}>
            {imageList[4]}
          </Col>
        </Row>
        <Modal
          width={400}
          height={600}
          visible={visible}
          title="图片画廊"
          onCancel={this.closeGallery}
          footer={null}
        >
          {<img src={currentImageSrc} style={{ width: '100%' }} alt="" />}
        </Modal>
      </div>
    );
  }
}

export default Gallery;
