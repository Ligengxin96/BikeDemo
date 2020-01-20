const Mock = require('mockjs');

module.exports = {
  'GET /api/order': (req, res) => {
    res.status(200).json(Mock.mock({
      code: '1',
      note: '请求成功',
      total: 85,
      'result|85': [{
        'id|+1': 1,
        orderId: /T180[0-9]{6}/,
        bikeId: /B280[0-9]{6}/,
        userId: /U100[0-9]{6}/,
        username: '@cname',
        phone: /1[0-9]{10}/,
        distance: /[0-9]{4}/,
        totalTime: /[0-9]{2}/,
        'status|1-2': 1,
        startTime: '@datetime',
        endTime: '@datetime',
        shouldPay: /[0-9]{3}/,
        userPay: /[0-9]{3}/,
      }],
    }));
  },
};
