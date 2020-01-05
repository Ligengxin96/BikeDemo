const Mock = require('mockjs');

module.exports = {
  'GET /api/user': (req, res) => {
    res.status(200).json({
      users: Mock.mock({
        id: '@id',
        name: '@cname',
        phone: /^1[34578]\d{9}$/,
        'age|11-99': 1,
        city: '@city',
        address: '@county(true)',
        isMale: '@boolean',
        email: '@email',
        createTime: '@datetime',
        avatar() {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.name);
        },
      }),
    });
  },
};

// module.exports = {
//   'GET /api/posts': (req, res) => {
//     res.status(200).json({
//       users: Mock.mock({
//         'data|80-100': [ // 随机生成80 - 100条数据
//           {
//             id: '@id',
//             name: '@name', // 随机生成英文名 @cname 生成中文名
//             nickName: '@last',
//             phone: /^1[34578]\d{9}$/,
//             'age|11-99': 1,
//             address: '@county(true)',
//             isMale: '@boolean',
//             email: '@email',
//             createTime: '@datetime',
//             avatar() {
//               return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1));
//             },
//           },
//         ],
//       }),
//     });
//   },
// };
