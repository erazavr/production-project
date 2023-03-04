import path from 'path'
import type webpack from 'webpack'
import { DefinePlugin } from 'webpack'
import { buildCssLoaders } from '../build/loaders/buildCssLoaders'
import { type BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }

  const rules = config.module!.rules as webpack.RuleSetRule[]

  config.resolve!.modules!.push(paths.src)
  config.resolve!.extensions?.push('.ts', '.tsx ')
  config.module!.rules?.push(buildCssLoaders(true))
  config.module!.rules = rules.map((rule: webpack.RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }
    }
    return rule
  })
  config.module!.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })

  config.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('')
  }))

  return config
}
