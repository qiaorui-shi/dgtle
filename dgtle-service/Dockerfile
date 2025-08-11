# 使用官方Node.js镜像作为基础
FROM node:22-alpine
# 安装Python 3.8
RUN apk add --no-cache python3 py3-pip
# 创建工作目录
WORKDIR /usr/src/app
# 将构建参数赋值给环境变量
ENV NODE_ENV=${NODE_ENV}
# 复制package.json和package-lock.json
COPY package*.json ./
# 安装项目依赖
RUN pnpm install
# 安装pm2
RUN pnpm install -g pm2
# 复制项目文件
COPY . .
# 构建项目
RUN pnpm run build
# 暴露应用端口
EXPOSE 3000
# 使用pm2启动服务
CMD ["pm2-runtime", "dist/main.js", "--name", "dgtle-service"]
