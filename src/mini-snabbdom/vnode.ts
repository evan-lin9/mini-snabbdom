export type Classes = Record<string, boolean>

export interface VNodeData {
  class?: Classes;
  key?: number | string;
  [key: string]: any;
}

export type Primitive = string | number
export interface VNode {
  sel: string | undefined; // 表示选择器
  data: VNodeData | undefined; // 用来接受类名，样式，事件处理等的对象
  children: Array<VNode | string> | undefined; // 子节点
  elm: Node | undefined; // 真实 dom
  text: string | undefined; // 文本
  key: Primitive | undefined; // diff 算法优化的点
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined,
): VNode {
  const key = data === undefined ? undefined : data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}
