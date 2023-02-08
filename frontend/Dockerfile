FROM node:18
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=512
WORKDIR /app
COPY . .
RUN pwd
RUN npm install
RUN npm run build --verbose
RUN rm -rf /var/www/html
RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html
WORKDIR /
RUN rm -rf /app