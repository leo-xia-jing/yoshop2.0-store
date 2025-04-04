import Enum from '../enum'

/**
 * 枚举类：优惠券适用范围
 * ApplyRangeEnum
 */
export default new Enum([
  { key: 'ALL', name: '全部商品', value: 10 },
  { key: 'SOME', name: '指定商品', value: 20 },
  { key: 'EXCLUDE', name: '排除商品', value: 30 }
])
