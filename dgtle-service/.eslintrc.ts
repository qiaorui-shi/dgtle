module.exports = {
  parser: '@typescript-eslint/parser', // 使用TypeScript解析器来解析TypeScript代码
  parserOptions: {
    project: 'tsconfig.json', // 指定TypeScript配置文件
    tsconfigRootDir: __dirname, // 指定tsconfig.json所在的根目录
    sourceType: 'module', // 使用ES模块语法
  },
  plugins: ['@typescript-eslint/eslint-plugin'], // 使用TypeScript ESLint插件
  extends: [
    'plugin:@typescript-eslint/recommended', // 使用推荐的TypeScript规则
    'plugin:prettier/recommended', // 集成Prettier格式化规则
  ],
  root: true, // 表示这是根配置文件，ESLint不会在父目录中查找其他配置文件
  env: {
    node: true, // 启用Node.js全局变量
    jest: true, // 启用Jest测试框架的全局变量
  },
  ignorePatterns: ['.eslintrc.js'], // 忽略.eslintrc.js文件
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // 关闭接口名称必须以I开头的规则
    '@typescript-eslint/explicit-function-return-type': 'off', // 关闭必须显式声明函数返回类型的规则
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭必须显式声明模块边界类型的规则
    '@typescript-eslint/no-explicit-any': 'off', // 关闭禁止使用any类型的规则
    '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量的警告
  },
};
