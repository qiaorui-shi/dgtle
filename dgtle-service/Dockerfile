# 使用官方Node.js镜像作为基础
FROM node:22-alpine

# 创建工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露应用端口(根据您的实际端口修改)
EXPOSE 3000
