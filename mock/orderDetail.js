const Mock = require('mockjs');

module.exports = {
  'GET /api/orderDetail': (req, res) => {
    res.status(200).json(Mock.mock({
      code: '1',
      note: '请求成功',
      total: 1,
      result: [{
        'id|+1': 1,
        orderId: /T180[0-9]{6}/,
        bikeId: /B280[0-9]{6}/,
        userId: /U100[0-9]{6}/,
        username: '@cname',
        phone: /1[0-9]{10}/,
        'distance|1-9.2': 1,
        'totalTime|1-200': 200,
        'orderStatus|1-2': 1,
        'userBikeModel|1-2': 1,
        startTime: '@datetime',
        endTime: '@datetime',
        'shouldPay|1-2.1': 1,
        'userPay|1-2.1': 1,
        'battery|0-100': 1,
        startPoint: '北京市中华人民共和国教育部',
        endPoint: '北京市天安门广场',
        position: '@county(true)',
      }],
    }));
  },
};
