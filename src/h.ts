import { vnode, VNode, VNodeData } from './vnode'
import { isDef, isNumOrStr } from './utils/index'

export type VNodeChildElement = VNode | string | number | undefined | null
export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNodeChildElement>

// 利用函数重载实现 h 函数的多种方式调用
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h(sel: string, second?: any, third?: any): VNode {
  let data: VNodeData;
  let children: any;
  let text: any;

  if (isDef(third)) { // 先判断是否接收到 3 个参数
    if (second !== null) {
      data = second
    }
    if (Array.isArray(third)) {
      children = third
    } else if (isNumOrStr(third)) {
      text = third
    } else if (third && third.sel) {
      children = [third]
    }
  } else if (isDef(second) && second !== null) { // 再判断是否接收到 2 个参数
    if (Array.isArray(second)) {
      children = second
    } else if (isNumOrStr(second)) {
      text = second
    } else if (second && second.sel) {
      children = [second]
    } else {
      data = second
    }
  }
  if (isDef(children)) {
    for (let i = 0; i < children.length; ++i) {
      if (isNumOrStr(children[i])) {
        children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
      }
    }
  }
  return vnode(sel, data, children, text, undefined)
}
