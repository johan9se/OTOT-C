FROM node:16
COPY package*.json .
RUN npm i
COPY . .
COPY index.js app.js ./
EXPOSE 8000
CMD ["npm", "start"]