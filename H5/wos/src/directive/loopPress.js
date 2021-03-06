import Vue from 'vue'
// 注册
// Vue.directive('loopPress', {
//     bind: function () {
//         console.log("bandgding")
//     },
//     inserted: function () {},
//     update: function () {},
//     componentUpdated: function () {},
//     unbind: function () {}
// })
// export default {
//   install(Vue, options = {
//     time: 2000,
//   }) {
//     Vue.directive('test', {
//         bind: function () {
//             console.log("bandgding")
//         },
//         inserted: function () {},
//         update: function () {},
//         componentUpdated: function () {},
//         unbind: function () {}
//     })
    let options = {
        time: 2000,
    }
    Vue.directive('longpress', {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `
          if (compName) { warn += `Found in component '${compName}' ` }
          console.warn(warn)
        }
        // 定义变量
        let pressTimer = null
        // 定义函数处理程序
        // 创建计时器（ 1秒后执行函数 ）
        let start = (e) => {
          if (e.type === 'click' && e.button !== 0) {
            return
          }
          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // 执行函数
              let { attrs } = vNode.data
              handler(attrs, el, binding, vNode)
            }, options.time)
          }
        }

        // 取消计时器
        let cancel = (e) => {
          // 检查计时器是否有值
          if (pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
        }
        // 运行函数
        const handler = (attr, el, binding, vNode) => {
          // 执行传递给指令的方法
          binding.value(attr, el, binding, vNode)
        }

        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
      },
    })
//   },
// }