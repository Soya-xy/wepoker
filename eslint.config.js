import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  unocss.configs.flat,
  {
    rules: {
      'no-console': 1,
      'node/prefer-global/process': 0,
    },
    ignores: [
      '.vscode',
    ],
  },
)
