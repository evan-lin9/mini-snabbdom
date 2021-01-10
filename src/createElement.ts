// 创建真实 dom
export default function createElement(vnode) {
  const dom = document.createElement(vnode.sel)
  // 字节点是文本还是 children
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    dom.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 遍历兄弟节点
    for (let i = 0; i < vnode.children.length; i++) {
      const child = vnode.children[i];
      const childDom = createElement(child);
      // 插入到父节点下
      dom.appendChild(childDom)
    }
  }
  // 补充真实的 element 对象
  vnode.elm = dom
  // 返回一个真实 dom
  return dom
}