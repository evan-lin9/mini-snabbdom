import createElement from './createElement'
import { vnode, VNode } from './vnode' 
import { isDef } from '../utils';

function isEle(pet: Element | VNode): pet is Element {
  return (pet as Element).tagName !== undefined;
}

function addVnodes(parentNode: Node, vnodes: VNode[]) {
  // console.log(parentNode)
  for(let i = 0; i < vnodes.length; i++) {
    // 依次创建 dom 并插入
    console.log(vnodes[i])
    const childDom = createElement(vnodes[i]);
    parentNode.insertBefore(childDom, null)
    // parentNode.insertBefore(childDom)
  }
}

function diff (oldVnode: VNode, newVnode: VNode) {
  if (oldVnode === newVnode) return
  const elm = newVnode.elm = oldVnode.elm
  if (isDef(newVnode.text)) {
    if (newVnode.text === oldVnode.text) return
    if (isDef(oldVnode.children)) {
      console.log('移除oldCh')
      // 这里我并没有执行 removeVnodes 函数，猜测跟下面一段代码有关？
      // 果然如此！因为执行新增文本操作，会直接覆盖掉原来的子节点
      // mdn 证实了我的推测 https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
      // Setting textContent on a node removes all of the node's children
      // and replaces them with a single text node with the given string value.
    }
    elm.textContent = newVnode.text
  } else {
    if (isDef(oldVnode.children) && isDef(newVnode.children)) {
      if (oldVnode.children === newVnode.children) return;
      console.log('updateChildren')
    } else if (isDef(newVnode.children)) {
      if (isDef(oldVnode.text)) elm.textContent = '';
      // 准备实现这个方法
      addVnodes(elm, newVnode.children as VNode[])
    } else if (isDef(oldVnode.children)) {
      console.log('removeVnodes')
    }

    if (isDef(oldVnode.text)) elm.textContent = ''
  }
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
    diff(oldVnode, newVnode)
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