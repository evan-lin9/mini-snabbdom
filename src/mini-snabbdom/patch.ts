import createElement from './createElement'
import { vnode, VNode } from './vnode' 

function isEle(pet: Element | VNode): pet is Element {
  return (pet as Element).tagName !== undefined;
}

export function patch(oldVnode: Element | VNode, newVnode: VNode) {
  // 判断第一个参数是否为 Element 类型
  if (isEle(oldVnode)) {
    // 创建一个 vnode
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }

  // 判断是否为统一节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 同一个节点，则开始 diffs 算法
    console.log('diff')
  } else {
    const dom = createElement(newVnode)
    // 先插入新的节点后再删除旧节点
    if (oldVnode.elm !== undefined && dom) {
      oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
    }
    // 删除老的 dom
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}