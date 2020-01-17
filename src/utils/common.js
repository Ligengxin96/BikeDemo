/**
 * 计算表格的选中数量
 * @param {object} selectDatas 表格组件通用格式
 * @param {object} pagination 表格组件通用格式
 */
export function calcSelectCount(selectDatas = {}, pagination = {}) {
  let selectCount = 0;
  const { total = 0 } = pagination;
  const { selectedAll, selectedRowKeys = [] } = selectDatas;
  if (selectedAll) {
    selectCount = total - selectedRowKeys.length;
  } else {
    selectCount = selectedRowKeys.length;
  }
  return selectCount;
}
