import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图和折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import { getDictionary } from '../../../../utils/common';

class Pie extends Component {
  getOption = () => {
    const option = {
      title: {
        text: '用户骑行订单',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: getDictionary('weekData').map(item => item.note),
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '55%',
          center: [
            '50%', '60%',
          ],
          data: [{
            value: 1000,
            name: '周一',
          }, {
            value: 1000,
            name: '周二',
          }, {
            value: 2000,
            name: '周三',
          }, {
            value: 1500,
            name: '周四',
          }, {
            value: 3000,
            name: '周五',
          }, {
            value: 2000,
            name: '周六',
          }, {
            value: 1200,
            name: '周日',
          }],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    return option;
  }

  getOption2 = () => {
    const option = {
      title: {
        text: '用户骑行订单',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: getDictionary('weekData').map(item => item.note),
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          center: ['50%', '60%'],
          data: [{
            value: 1000,
            name: '周一',
          }, {
            value: 1000,
            name: '周二',
          }, {
            value: 2000,
            name: '周三',
          }, {
            value: 1500,
            name: '周四',
          }, {
            value: 3000,
            name: '周五',
          }, {
            value: 2000,
            name: '周六',
          }, {
            value: 1200,
            name: '周日',
          },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    return option;
  }

  getOption3 = () => {
    const option = {
      title: {
        text: '用户骑行订单',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: getDictionary('weekData').map(item => item.note),
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [{
            value: 1000,
            name: '周一',
          }, {
            value: 1000,
            name: '周二',
          }, {
            value: 2000,
            name: '周三',
          }, {
            value: 1500,
            name: '周四',
          }, {
            value: 3000,
            name: '周五',
          }, {
            value: 2000,
            name: '周六',
          }, {
            value: 1200,
            name: '周日',
          },
          ].sort((a, b) => { return a.value - b.value; }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay() {
            return Math.random() * 200;
          },
        },
      ],
    };
    return option;
  }

  render() {
    return (
      <div>
        <Card>
          <ReactEcharts
            echarts={echarts}
            option={this.getOption()}
            notMerge
            lazyUpdate
            style={{ height: 500 }}
          />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <ReactEcharts
            echarts={echarts}
            option={this.getOption2()}
            notMerge
            lazyUpdate
            style={{ height: 500 }}
          />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <ReactEcharts
            echarts={echarts}
            option={this.getOption3()}
            notMerge
            lazyUpdate
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}

export default Pie;
