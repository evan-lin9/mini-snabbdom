import { h } from './mini-snabbdom/h'
import { patch } from './mini-snabbdom/patch'

const root: HTMLElement = document.getElementById('root');
// case1.1: 新老节点都为文本且内容一致，不更新
// case1.2: 新老节点都为文本,但内容不一致，需要更新
const _vnode1 = h('p', {}, '宇哥在学习')
const _vnode2 = h('p', {}, '宇哥在学习')
const _vnode3 = h('p', {}, '宇哥在学习手写 diff 算法')
// 通过

// case2: 老节点是有子节点，新节点是文本
const _vnode4 = h(
  'ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, 'C'),
  ]
)
const _vnode5 = h(
  'ul', {}, '宇哥在学习'
)
// 通过

// case3: 老节点是文本，新节点有子节点
const vnode1 = h(
  'ul', {}, '宇哥在学习'
)
const vnode2 = h(
  'ul', {}, [
    h('li', {}, 'Java'),
    h('li', {}, 'Go'),
    h('li', {}, 'PHP'),
  ]
)


patch(root, vnode1)

document.getElementById('btn').addEventListener('click', function() {
  patch(vnode1, vnode2)
})

