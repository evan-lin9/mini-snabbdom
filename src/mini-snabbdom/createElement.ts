import { VNode } from "./vnode";
import { isUndef, isNumOrStr } from "../utils";

// 创建真实 dom
export default function createElement(vnode: VNode): Node {
  const { sel, data, children, text } = vnode
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

  // 返回一个真实 dom
  return vnode.elm
}