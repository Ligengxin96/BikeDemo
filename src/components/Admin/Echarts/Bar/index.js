import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图和折线图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import { getDictionary } from '../../../../utils/common';

class Bar extends Component {
  getFirstOption = () => {
    const option = {
      color: ['#3398DB'],
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: getDictionary('weekData').map(item => item.note),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  }

  getSecondChartOption = () => {
    const option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: ['ofo', '摩拜', '哈喽'],
      },
      xAxis: [
        {
          type: 'category',
          data: getDictionary('weekData').map(item => item.note),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'ofo',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [1500, 3000, 4500, 6000, 8000, 10000, 15000],
        },
        {
          name: '哈喽',
          type: 'bar',
          data: [1000, 2000, 2500, 4000, 6000, 7000, 8000],
        },
      ],
    };
    return option;
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <ReactEcharts echarts={echarts} option={this.getFirstOption()} notMerge lazyUpdate style={{ height: 500 }} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <ReactEcharts echarts={echarts} option={this.getSecondChartOption()} notMerge lazyUpdate style={{ height: 500 }} />
        </Card>
      </React.Fragment>
    );
  }
}

export default Bar;
