import { type PluginItem } from '@babel/core'

export default function (): PluginItem {
  return {
    visitor: {
      Program (path, state) {
        const forbidden = state.opts.props || []
        path.traverse({
          JSXIdentifier (current) {
            const node = current.node.name
            if (forbidden.includes(node)) {
              current.parentPath.remove()
            }
          }
        })
      }
    }
  }
}
