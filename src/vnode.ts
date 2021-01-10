export type Props = Record<string, any>
export type Classes = Record<string, boolean>

export interface VNodeData {
  props?: Props;
  class?: Classes;
  key?: number | string;
  [key: string]: any;
}

export interface VNode {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string> | undefined
  elm: Node | undefined
  text: string | undefined
  key: string | number | undefined
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: [] | undefined,
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
