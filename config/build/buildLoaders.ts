import type webpack from 'webpack'
import { buildBabelLoaders } from './loaders/buildBabelLoaders'
import { buildCssLoaders } from './loaders/buildCssLoaders'
import { type BuildOptions } from './types/config'

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }
  const codeBabelLoader = buildBabelLoaders({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoaders({ ...options, isTsx: true })
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }
  const cssLoader = buildCssLoaders(isDev)
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/
  // }

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader
  ]
}
