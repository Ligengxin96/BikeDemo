import customer from './customer';
import cityManage from './cityManage';

const getApis = () => {
  const apis = { // apis: 数据类型对象数组 { [], ... }
    customer, // 客户模块接口
    cityManage, // 城市管理模块接口
  };
  const api = {};
  const apisKey = Object.keys(apis) || [];
  apisKey.forEach((element) => {
    const items = apis[element]; // 提取apis每一个数组(对象数组里面的每一个数组)
    const finalApi = {};
    items.forEach((inner) => {
      const { key, url } = inner; // items:  api文件中的数据类型为 [{code, key, url }, ...]
      finalApi[key] = url;
    });
    api[element] = finalApi;
  });
  return api; // 最终返回的是一个对象中包含了多个对象(引入多少个api文件就有多少个对象) { customer: { key: url }, ... }
};

export default getApis;
