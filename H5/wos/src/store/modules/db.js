import DB from '@/utils/db'
import cloneDeep from 'lodash/cloneDeep'

/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {Object} param dbName {String} 数据库名称
 * @param {Object} param path {String} 路径
 * @param {Object} param user {Boolean} 区分用户
 * @param {Object} param validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} param defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
 */
function pathInit({
  path = '',
  validator = () => true,
  defaultValue = ''
}) {
  const currentPath = path || ''
  const value = DB.get(currentPath).value()
  if (!(value !== undefined && validator(value))) {
    DB.set(currentPath, defaultValue).write()
  }
  return currentPath
}

export default {
  namespaced: true,
  actions: {
    /**
     * @description 将数据存储到指定位置 | 路径不存在会自动初始化
     * @param {Object} param path {String} 存储路径
     * @param {Object} param value {*} 需要存储的值
     */
    set(context, { path = '', value = '' }) {
      DB
        .set(
          pathInit({ path }),
          value
        )
        .write()
    },
    /**
     * @description 获取数据
     * @description 效果类似于取值 dbName.path || defaultValue
     * @param {Object} param dbName {String} 数据库名称
     * @param {Object} param path {String} 存储路径
     * @param {Object} param defaultValue {*} 取值失败的默认值
     * @param {Object} param user {Boolean} 是否区分用户
     */
    get(
      context,
      { path = '', defaultValue = '' }
    ) {
      return new Promise(resolve => {
        resolve(
          cloneDeep(
            DB
              .get(
                pathInit({
                  path,
                  defaultValue
                })
              )
              .value()
          )
        )
      })
    },
    /**
     * @description 获取存储数据库对象
     * @param {Object} context context
     * @param {Object} param user {Boolean} 是否区分用户
     */
    database(context) {
      return new Promise(resolve => {
        resolve(
          DB.get(
            pathInit({
              path: '',
              defaultValue: {}
            })
          )
        )
      })
    },
    /**
     * @description 清空存储数据库对象
     * @param {Object} context context
     * @param {Object} param user {Boolean} 是否区分用户
     */
    databaseClear(context) {
      return new Promise(resolve => {
        resolve(
          DB.get(
            pathInit({
              path: '',
              validator: () => false,
              defaultValue: {}
            })
          )
        )
      })
    }
  }
}
