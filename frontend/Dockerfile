FROM node:13.12.0-alpine
# pull official base image

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install --silent
RUN npm install dateformat --silent
RUN npm install react-scripts@3.4.1 -g --silent

WORKDIR ../frontend

COPY package.json ./
COPY package-lock.json ./

# add app
COPY . ./

# start app
CMD ["npm", "start"]
