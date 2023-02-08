FROM nginx:1.15.0
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

#WORKDIR /app
#COPY package*.json ./app
#RUN npm install
#COPY . ./app
#ENV PORT 4010
#EXPOSE 4010
#CMD ["npm", "run", "start"]