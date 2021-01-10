import createElement from './createElement'
import { vnode } from './vnode' 

export function patch(oldVnode, newVnode) {
  // 判断第一个参数是否为 vnode
  if (oldVnode.sel == undefined) {
    // 创建一个 vnode
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }

  // 判断是否为统一节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 同一个节点，则开始 diffs 算法
    console.log('diff')
  } else {
    // 创建真实 dom
    const dom = createElement(newVnode)
    // 先插入新的节点后再删除旧节点
    if (oldVnode.elm !== undefined && dom) {
      oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
    }
    // 删除老的 dom
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}