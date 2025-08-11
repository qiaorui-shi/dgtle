# 构建阶段
FROM node:22-alpine AS builder
# 创建工作目录
WORKDIR /usr/src/app
# 复制package.json和package-lock.json
COPY package*.json ./
# 安装依赖
RUN npm install
# 复制项目文件
COPY . .
RUN npm run build