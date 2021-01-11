import { h } from './mini-snabbdom/h'
import { patch } from './mini-snabbdom/patch'

const root: HTMLElement = document.getElementById('root');

const vnode = h(
  'ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, 'C'),
  ]
)
console.log(vnode)
patch(root, vnode)

