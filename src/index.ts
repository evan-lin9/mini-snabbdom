import { h } from './h'
import { patch } from './patch'

const vnode = h('ul', [
  h('li', '苹果'),
  h('li', h('div', [
  h('li', '苹果'),
    h('p', 'hh'),
    h('p', 'hh'), 
  ])),
]);

const root: HTMLElement = document.getElementById('root');
patch(root, vnode)

