import { h } from './mini-snabbdom/h'
import { patch } from './mini-snabbdom/patch'

const root: HTMLElement = document.getElementById('root');
const vnode1 = h('h1', '宇哥在学习')

const vnode2 = h(
  'ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, [
      h('h1', '标题'),
      h('p', '内容')
    ]),
  ]
)
patch(root, vnode1)

document.getElementById('btn').addEventListener('click', function() {
  patch(vnode1, vnode2)
})

