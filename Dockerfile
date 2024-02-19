FROM node

WORKDIR /usr/workspace/novovarejo.com/installmentsAPI

COPY package.json . 

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD npm start