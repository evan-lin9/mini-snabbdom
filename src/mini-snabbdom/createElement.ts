import { VNode } from "./vnode";
import { isNumOrStr, isUndef } from "../utils";

// 创建真实 dom
export default function createElement(vnode: VNode): Node {
  const { sel, children, text } = vnode
  if (isUndef(sel)) {
    vnode.elm = document.createTextNode(text)
  } else {
    const dom = vnode.elm = document.createElement(sel)
  
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i]
        if (child != null) {
          dom.appendChild(createElement(child as VNode))
        }
      }
    } else if (isNumOrStr(text)) {
      // 子节点是文本
      dom.appendChild(document.createTextNode(text))
    }
  }

  // 返回一个真实 dom
  return vnode.elm
}