import React from 'react';
import { Card, Carousel } from 'antd';
import styles from '../../../../style/common.less';
import carouselStyle from './index.less';

class Carousels extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card title="文字背景轮播" className={styles.myCard}>
          <Carousel autoplay className={carouselStyle.myCarousels}>
            <div><h3>Antd</h3></div>
            <div><h3>Dva</h3></div>
            <div><h3>React</h3></div>
          </Carousel>
        </Card>
        <Card title="文字背景轮播(fade动画效果)" className={styles.myCard}>
          <Carousel autoplay effect="fade" className={carouselStyle.myCarousels}>
            <div><h3>My Project</h3></div>
            <div><h3>My Demo </h3></div>
            <div><h3>My Style</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className={styles.myCard}>
          <Carousel autoplay className={carouselStyle.myCarouselsImage}>
            <div>
              <h3>丽江古镇</h3>
              <img src="/assets/carousel/carousel-1.jpg" alt="" />
            </div>
            <div>
              <h3>泸沽湖</h3>
              <img src="/assets/carousel/carousel-2.jpg" alt="" />
            </div>
            <div>
              <h3>玉龙雪山</h3>
              <img src="/assets/carousel/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </React.Fragment>
    );
  }
}

export default Carousels;
