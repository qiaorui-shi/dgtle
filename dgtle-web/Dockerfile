# 使用官方nginx镜像作为基础
FROM nginx:alpine

# 创建工作目录
RUN mkdir -p /usr/share/nginx/html

# 复制dist文件到nginx默认目录
COPY ./dist /usr/share/nginx/html/

# 复制nginx配置文件
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]